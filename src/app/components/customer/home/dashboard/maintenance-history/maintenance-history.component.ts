import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../../../../services/maintenance/maintenance.service';
import {
  Dropdown,
  DropdownComponent,
} from '../../../../../shared/components/dropdown/dropdown.component';
import { CdkNoDataRow } from '@angular/cdk/table';

@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    DropdownComponent,
    DropdownComponent,
    CdkNoDataRow,
  ],
  templateUrl: './maintenance-history.component.html',
  styleUrl: './maintenance-history.component.css',
})
export class MaintenanceHistoryComponent {
  public maintenanceList: any = [];
  public selectedValue: any;
  public selectedBay: number = 0;
  public selectedInitDate: string = '0';
  public selectedEndDate: string = '0';
  public bayDropdrownInfo: Dropdown = {
    label: 'Bahía',
    model: 'bay',
    type: 'select',
    options: [
      {
        value: '1',
        label: 'Bahía 1',
      },
      {
        value: '2',
        label: 'Bahía 2',
      },
      {
        value: '3',
        label: 'Bahía 3',
      },
      {
        value: '4',
        label: 'Bahía 4',
      },
      {
        value: '5',
        label: 'Bahía 5',
      },
      {
        value: '6',
        label: 'Bahía 6',
      },
    ],
  };

  public initDateDropdrownInfo: Dropdown = {
    label: 'Fecha de inicio',
    model: 'date',
    type: 'date',
    placeholder: 'Fecha de inicio',
    options: [],
  };

  public endDateDropdrownInfo: Dropdown = {
    label: 'Fecha de fin',
    model: 'date',
    type: 'date',
    placeholder: 'Fecha de fin',
    options: [],
  };

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.initInformation();
    // this.initDropDownInfo();
  }

  public initInformation() {
    this.maintenanceService.getMaintenances().subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.maintenanceList = response.data;
          console.log(response);
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  handleFilterInformation() {
    const formattedInitDate = this.formatDateToApi(this.selectedInitDate);
    const formattedEndDate = this.formatDateToApi(this.selectedEndDate);

    console.log(this.selectedBay, formattedInitDate, formattedEndDate);
    this.maintenanceService
      .getFilteredMaintenances(
        this.selectedBay,
        formattedInitDate,
        formattedEndDate
      )
      .subscribe({
        next: (response) => {
          // console.log(response);
          this.maintenanceList = response.data;
        },
        error: (e) => {
          console.error(e);
        },
      });

    // this.maintenanceService
    //   .getFilteredMaintenances(1, '2025-10-01', '2025-10-10')
    //   .subscribe((data) => console.log(data));
  }

  // public execApi(bayId?: number, startDate?: string, endDate?: string) {

  // }

  private formatDateToApi(dateString: string): string {
    if (!dateString) return ''; // ⚙️ Devuelve string vacío si no hay valor

    const datePart = dateString.split(' ')[0];
    const [day, month, year] = datePart.split('/');

    if (!day || !month || !year) return ''; // ⚙️ También devuelve string vacío si el formato no es válido

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  seeMaintenanceDetails(bayId: number) {
    this.router.navigate([`/home/maintenance-history/maintenance/${bayId}`]);
  }

  // onBayValueReceived(event: any) {
  //   console.log(event);
  //   this.selectedBay = event.value;
  // }
  // onDateValueReceived(event: any) {
  //   this.selectedDate = event.value;
  // }

  onSelectedDropdownValue(type: string, value: any) {
    const valuesMap: { [key: string]: string } = {
      selectedBay: 'selectedBay',
      selectedInitDate: 'selectedInitDate',
      selectedEndDate: 'selectedEndDate',
    };
    console.log(type);
    console.log(value.value);

    if (valuesMap[type]) {
      (this as any)[valuesMap[type]] = value.value;
    }
  }

  handleClearFilters() {}
}
