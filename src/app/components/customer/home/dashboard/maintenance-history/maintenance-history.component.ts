import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../../../../services/maintenance/maintenance.service';
import {
  Dropdown,
  DropdownComponent,
} from '../../../../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [CommonModule, MatIcon, DropdownComponent, DropdownComponent],
  templateUrl: './maintenance-history.component.html',
  styleUrl: './maintenance-history.component.css',
})
export class MaintenanceHistoryComponent {
  public maintenanceList: any = [];
  public selectedValue: any;
  public selectedBay: number = 0;
  public selectedDate: number = 0;
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

  public dateDropdrownInfo: Dropdown = {
    label: 'Fecha',
    model: 'date',
    type: 'select',
    options: [],
  };

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.initInformation();
    this.initDropDownInfo();
  }

  public initInformation() {
    this.maintenanceService.getMaintenances().subscribe({
      next: (response) => {
        this.maintenanceList = response;
        console.log(response);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  public initDropDownInfo() {}

  handleFilterInformation() {
    console.log(this.selectedBay, this.selectedDate);
    // if (this.selectedBay != 0 && status) {
    //   let status = '';
    //   this.maintenanceService
    //     .getFilteredMaintenances(status, this.selectedBay)
    //     .subscribe({
    //       next: (response) => {
    //         console.log(response);
    //         this.maintenanceList = response
    //       },
    //       error: (e) => {
    //         console.error(e);
    //       },
    //     });
    // } else {
    // }
  }
  seeMaintenanceDetails(bayId: number) {
    this.router.navigate([`/home/maintenance-history/maintenance/${bayId}`]);
  }

  onBayValueReceived(event: any) {
    console.log(event);
    this.selectedBay = event.value;
  }
  onDateValueReceived(event: any) {
    this.selectedDate = event.value;
  }
}
