import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { SelectDropDownModule } from 'ngx-select-dropdown';

export interface Dropdown {
  label: string;
  model: string;
  type: string;
  placeholder?: string;
  options: DropdownOption[];
}

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [SelectDropDownModule, CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() public selectedValue: any;
  @Input() public dropdownInfo: Dropdown;
  @Output() public emitSelectValue: EventEmitter<any> = new EventEmitter();

  @ViewChildren('datepicker') datepickers!: QueryList<ElementRef>;

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

  public updateDropdownConfig(): void {
    this.dropdownConfig.placeholder = this.dropdownInfo.label;
  }

  /*
  public onEmitSelectValue(): void {
    console.log('selectedValue', this.selectedValue);
    this.emitSelectValue.emit(this.selectedValue);
  }*/

  ngOnInit(): void {
    this.updateDropdownConfig();
  }
  /*
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      console.log('🔄 Detectado cambio en selectedValue:', this.selectedValue);
      this.onEmitSelectValue(); // Llamamos solo cuando hay cambio
    }
  }
*/

  public onEmitSelectValue(value: any): void {
    //console.log('🔄 Detectado cambio en selectedValue:', this.selectedValue);
    // console.log("value",value);
    /*// Si el nuevo valor es igual al anterior, no emitirlo
    if (this.selectedValue === value || !value || Object.keys(value).length === 0) {
        console.warn("⚠️ Evitando emisión duplicada o vacía:", value);
        return;
    }
*/
    //console.log('📤 Emisión única de valor:', value);
    this.emitSelectValue.emit(value);
  }

  // ngAfterViewInit(): void {
  //   this.datePickerInitialization();
  // }

  ngAfterViewInit(): void {
    this.datePickerInitialization();
    this.datepickers.changes.subscribe(() => {
      this.datePickerInitialization();
    });
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
            // this.entityForm.get(fieldModel)?.setValue(dateStr);
            this.emitSelectValue.emit({ field: fieldModel, value: dateStr });
          }
        },
      });
    });
  }
}
