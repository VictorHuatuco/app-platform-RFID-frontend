import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';

export interface Dropdown {
  label: string;
  model: string;
  type: string;
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
}
