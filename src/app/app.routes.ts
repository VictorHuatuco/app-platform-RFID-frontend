import { Routes } from '@angular/router';
import { HomeComponent } from './components/customer/home/home.component';
import { BayMonitoringComponent } from './components/customer/home/dashboard/bay-monitoring/bay-monitoring.component';
import { MaintenanceHistoryComponent } from './components/customer/home/dashboard/maintenance-history/maintenance-history.component';
import { AlertsHistoryComponent } from './components/customer/home/dashboard/alerts-history/alerts-history.component';
import { MaintenanceDetailComponent } from './components/customer/home/dashboard/maintenance-history/maintenance-detail/maintenance-detail.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'bay-monitoring',
        component: BayMonitoringComponent,
      },
      {
        path: 'maintenance-history',
        children: [
          {
            path: '',
            component: MaintenanceHistoryComponent,
          },

          {
            path: 'maintenance/:id',
            component: MaintenanceDetailComponent,
          },
        ],
      },
      {
        path: 'alert-history',
        component: AlertsHistoryComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home/bay-monitoring',
    pathMatch: 'full',
  },
];
