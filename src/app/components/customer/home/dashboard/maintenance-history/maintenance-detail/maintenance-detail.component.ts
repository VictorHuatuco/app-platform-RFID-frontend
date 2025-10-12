import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MaintenanceService } from '../../../../../../services/maintenance/maintenance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance-item',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './maintenance-detail.component.html',
  styleUrl: './maintenance-detail.component.css',
})
export class MaintenanceDetailComponent {
  public maintenanceId: number;
  public maintenance: any = {};

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.maintenanceId = +params['id']; // Convertir a número
        console.log('ID obtenido:', this.maintenanceId);
      }
    });

    this.maintenanceService.getMaintenanceById(this.maintenanceId).subscribe({
      next: (response) => {
        this.maintenance = response;
        console.log(response);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  constructor(
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute
  ) {}
}
