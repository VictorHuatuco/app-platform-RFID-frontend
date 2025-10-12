import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class BayService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'bahias';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  // obtener todos las bahias
  getBays(): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  }

  // obtener mantenimiento por su id
  getLastMaintenance(bayId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/${bayId}/maintenance`);
  }
}
