import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'maintenance';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  // obtener todos los mantenimientos
  getMaintenances(): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  }

  // obtener mantenimiento por su id
  getMaintenanceById(maintenanceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/${maintenanceId}`);
  }

  // matenimientos de una bahia
  getMaintenanceByBayId(bayId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { bay_id: bayId },
    });
  }
  // mantenimientos entre fechas
  getMaintenancesPerDate(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { start_date: startDate, end_date: endDate },
    });
  }

  // obtener solo mantenimientos activos
  getActiveMaintenances(status: string): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { status: status },
    });
  }

  // obtener matenimientos activos y por bahia
  getFilteredMaintenances(status: string, bayId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { bay_id: bayId, status: status },
    });
  }
}
