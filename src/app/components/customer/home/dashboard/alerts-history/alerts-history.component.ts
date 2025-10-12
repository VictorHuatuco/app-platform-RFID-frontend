import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AlertService } from '../../../../../services/alert/alert.service';

@Component({
  selector: 'app-alerts-history',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './alerts-history.component.html',
  styleUrl: './alerts-history.component.css',
})
export class AlertsHistoryComponent {
  public alertsList: any = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getAlerts().subscribe({
      next: (response) => {
        this.alertsList = response;
        console.log(response);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
