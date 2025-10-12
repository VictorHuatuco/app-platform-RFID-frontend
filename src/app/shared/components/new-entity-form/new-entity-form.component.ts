import { SelectDropDownModule } from 'ngx-select-dropdown';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import 'flatpickr/dist/flatpickr.min.css';

@Component({
  selector: 'app-new-entity-form',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    SelectDropDownModule,
  ],
  templateUrl: './new-entity-form.component.html',
  styleUrl: './new-entity-form.component.css',
})
export class NewEntityFormComponent {
  @Input() public entityForm: FormGroup;
  @Input() public fields: any = [];
  @Input() public validators: any = {};
  @Output() public formChanged: EventEmitter<FormGroup> = new EventEmitter();
  @Output() departmentChanged: EventEmitter<string> = new EventEmitter();
  @Output() districtChanged: EventEmitter<string> = new EventEmitter();
  @Output() provinceChanged: EventEmitter<{
    departmentId: string;
    provinceId: string;
  }> = new EventEmitter();
  @Output() enterpriseChanged: EventEmitter<number> = new EventEmitter();
  @Output() clusterChanged: EventEmitter<number> = new EventEmitter();
  @Output() storeTypeChanged: EventEmitter<number> = new EventEmitter();

  @ViewChildren('datepicker') datepickers!: QueryList<ElementRef>;
  // @Output() dateSelected = new EventEmitter<Date>();

  ngOnInit(): void {
    this.entityForm.valueChanges.subscribe(() => {
      console.log('emite valor form', this.entityForm.value);
      this.formChanged.emit(this.entityForm);
    });
    if (this.fields.length) {
      this.updateDropdownConfig();
    }
  }

  public dropdownConfig = {
    displayKey: 'label',
    valueKey: 'value',
    search: true,
    height: '300px',
    limitTo: 0,
    placeholder: 'Selecciona una opción',
    searchPlaceholder: 'Buscar...',
    clearOnSelection: false,
    closeOnSelect: true,
    noResultsFound: 'No se encontraron resultados',
  };

  onSelectChange(event: any, fieldModel: string) {
    const selectedOption = event.value;
    console.log({ selectedOption });
    this.entityForm.get(fieldModel)?.setValue(selectedOption);

    if (fieldModel === 'department') {
      this.departmentChanged.emit(selectedOption);
    }

    if (fieldModel === 'district') {
      this.districtChanged.emit(selectedOption);
    }

    if (fieldModel === 'province') {
      const departmentId = this.entityForm.get('department')?.value;
      console.log(departmentId);
      console.log(selectedOption);
      this.provinceChanged.emit({ departmentId, provinceId: selectedOption });
    }

    if (fieldModel === 'enterprise') {
      this.enterpriseChanged.emit(selectedOption);
    }

    if (fieldModel === 'storeType') {
      this.storeTypeChanged.emit(selectedOption);
    }

    if (fieldModel === 'cluster') {
      this.clusterChanged.emit(selectedOption);
    }
  }

  public updateDropdownConfig() {
    this.fields.forEach((field: any) => {
      if (field.type === 'select') {
        field.dropdownConfig = {
          displayKey: 'label',
          search: true,
          height: '300px',
          limitTo: 0,
          placeholder: field.label,
          searchPlaceholder: 'Buscar...',
          clearOnSelection: false,
          closeOnSelect: true,
          noResultsFound: 'No se encontraron resultados',
        };
      }
    });
  }

  constructor() {}

  public isRequired(model: string): boolean {
    const fieldValidators = this.validators[model] || [];
    return fieldValidators.some(
      (validator: any) => validator === Validators.required
    );
  }

  ngAfterViewInit(): void {
    this.datePickerInitialization();
  }

  datePickerInitialization() {
    this.datepickers.forEach((dp) => {
      const fieldModel = dp.nativeElement.getAttribute('data-field');
      flatpickr(dp.nativeElement, {
        locale: Spanish,
        dateFormat: 'd/m/Y',
        disableMobile: true,
        onChange: (selectedDates, dateStr) => {
          if (fieldModel) {
            this.entityForm.get(fieldModel)?.setValue(dateStr);
          }
        },
      });
    });
  }

  // onDateSelected(selectedDate: Date, fieldModel: string) {
  //   this.entityForm.get(fieldModel)?.setValue(selectedDate);
  // }
}
