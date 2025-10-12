import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { GetUsers } from '../../models/user/getUsers';
import { ErrorModel } from '../../models/error';
import { GetUser } from '../../models/user/getUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private POST_ENDPOINT: string = 'User';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  pag(parameters: any): Observable<GetUsers> {
    let httpParams = new HttpParams({
      fromObject: parameters,
    });
    return this.httpClient.get<GetUsers>(`${this.REQUEST_URL}/pag`, { params: httpParams });
  }

  create(formData: FormData): Observable<ErrorModel> {
    return this.httpClient.post<ErrorModel>(`${this.REQUEST_URL}/CreateUser`, formData);
  }

  update(formData: FormData): Observable<ErrorModel> {
    return this.httpClient.post<ErrorModel>(`${this.REQUEST_URL}/UpdateUser`, formData);
  }

  delete(userId: number) {
    return this.httpClient.delete(`${this.REQUEST_URL}/DeleteUser/${userId}`);
  }

  getById(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/GetUser/${userId}`);
  }

  profile(): Observable<GetUser>{
    return this.httpClient.get<GetUser>(`${this.REQUEST_URL}/profile`);
  }

  updateProfile(formData:FormData): Observable<ErrorModel>{
    return this.httpClient.patch<ErrorModel>(`${this.REQUEST_URL}/profile`, formData);
  }
}
