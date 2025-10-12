import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetDashboard } from 'src/app/models/dashboard/getDashboard';
import { GetWidget } from 'src/app/models/dashboard/widget/getWidget';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient
  ) { }

  private POST_ENDPOINT: string = 'Dashboard';
  private BASE_URL: string = `${environment.sistemaWebAdmin}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  getListAll(idEnterprise: number = 0): Observable<GetDashboard> {
    return this.httpClient.get<GetDashboard>(`${this.REQUEST_URL}/enterprise/${idEnterprise}`);
  }

  /*getListWidgetTypes(): Observable<GetDashboard> {
    // return this.httpClient.get<GetDashboard>(`${this.REQUEST_URL}/enterprise/${idEnterprise}`);
  }*/

  create(data: any): Observable<any>{
    return this.httpClient.post<any>(`${this.REQUEST_URL}`,data);
  }

  update(data: any): Observable<any>{
    return this.httpClient.put<any>(`${this.REQUEST_URL}`,data);
  }

  delete(id: number){
    return this.httpClient.delete<any>(`${this.REQUEST_URL}/` + id);
  }

  deleteWidget(id: number){
    return this.httpClient.delete<any>(`${this.REQUEST_URL}/widget/` + id);
  }

  createWidget(data:any){
    return this.httpClient.post<any>(`${this.REQUEST_URL}/widget`,data);
  }

  updateWidget(data:any){
    return this.httpClient.put<any>(`${this.REQUEST_URL}/widget`,data);
  }

  getListAllWidgets(idDashboard: number = 0): Observable<GetWidget> {
    return this.httpClient.get<GetWidget>(`${this.REQUEST_URL}/widgets/${idDashboard}`);
  }

  getWidget(idWidget: number = 0): Observable<GetWidget> {
    return this.httpClient.get<GetWidget>(`${this.REQUEST_URL}/widget/${idWidget}`);
  }
}
