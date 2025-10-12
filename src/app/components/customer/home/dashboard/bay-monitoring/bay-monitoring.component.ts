import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BayService } from '../../../../../services/bay/bay.service';

@Component({
  selector: 'app-bay-monitoring',
  standalone: true,
  imports: [CommonModule, MatIcon, FormsModule],
  templateUrl: './bay-monitoring.component.html',
  styleUrl: './bay-monitoring.component.css',
})
export class BayMonitoringComponent {
  constructor(private router: Router, private bayService: BayService) {}
  public colorLegend: any = [
    {
      name: 'Disponible',
      status: 'active',
    },
    {
      name: 'Mantenimiento activo',
      status: 'inManteinance',
    },
    {
      name: 'Alerta',
      status: 'alert',
    },
    {
      name: 'Módulo desconectado',
      status: 'moduleDisconnected',
    },
  ];
  public baysInfo: any = [];

  seeMaintenanceDetails(bayId: number) {
    console.log(bayId);
    this.bayService.getLastMaintenance(bayId).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([
          `/home/maintenance-history/maintenance/${response.id}`,
        ]);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  ngOnInit() {
    this.bayService.getBays().subscribe({
      next: (response) => {
        this.baysInfo = response;
        console.log(response);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
