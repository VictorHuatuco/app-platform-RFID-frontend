import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'alerts';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  // obtener todos las alertas
  getAlerts(): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  }

  // obtener solo alertas no resueltas
  getAlertsUnresolved(isResolved: boolean): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { resolved: isResolved },
    });
  }

  // obtener alertas de una bahia
  getAlertsByBayId(bayId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { bay_id: bayId },
    });
  }

  // obtener alertas entre fechas
  getAlertsPerDate(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { start_date: startDate, end_date: endDate },
    });
  }

  // obtener alertas de un usuario específico
  getAlertsByUserId(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { user_id: userId },
    });
  }

  // obtener alertas no resueltas y con fecha
  getFilteredAlerts(isResolved: boolean, startDate: string): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`, {
      params: { resolved: isResolved, start_date: startDate },
    });
  }
}
