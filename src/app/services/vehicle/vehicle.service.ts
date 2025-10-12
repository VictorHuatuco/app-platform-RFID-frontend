import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroments/environment';
import { GetVehicles } from '../../models/vehicle/getVehicles';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'Vehicle';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  // getEnterprises(): Observable<any> {
  //   return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  // }

  // getValidateMasterEnterprise(data: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.REQUEST_URL}/master`, data);
  // }

  // getById(id: number): Observable<GetEnterprise> {
  //   return this.httpClient.get<GetEnterprise>(`${this.REQUEST_URL}/${id}`);
  // }

  getList(parameters: any): Observable<GetVehicles> {
    let httpParams = new HttpParams({
      fromObject: parameters,
    });
    return this.httpClient.get<GetVehicles>(`${this.REQUEST_URL}/pag`, {
      params: httpParams,
    });
  }

  getListExport(parameters: any): Observable<any> {
    let httpParams = new HttpParams({
      fromObject: parameters,
    });
    return this.httpClient.get<any>(`${this.REQUEST_URL}/export`, {
      params: httpParams,
    });
  }

  // getEnterprisesPagination(data: any): Observable<any> {
  //   //
  //   return this.httpClient.get<any>(`${this.REQUEST_URL}`, data);
  // }

  // createEnterprise(data: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.REQUEST_URL}`, data);
  // }

  // updateEnterprise(data: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.REQUEST_URL}/update`, data);
  // }

  // deleteEnterprise(enterpriseId: number): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.REQUEST_URL}/${enterpriseId}`);
  // }

  // searchEnterprise(
  //   enterpriseFilter: EnterpriseSearch
  // ): Observable<EnterpriseViewModel[]> {
  //   return this.httpClient.post<EnterpriseViewModel[]>(
  //     `${this.REQUEST_URL}/SearchEnterprises`,
  //     enterpriseFilter
  //   );
  // }

  // createEnterpriseContract(data: FormData): Observable<Enterprise> {
  //   return this.httpClient.post<Enterprise>(
  //     `${this.REQUEST_URL}/CreateEnterpriseContract`,
  //     data
  //   );
  // }

  // getEnterpriseContracts(
  //   enterpriseId: number
  // ): Observable<EnterpriseContract[]> {
  //   return this.httpClient.get<EnterpriseContract[]>(
  //     `${this.REQUEST_URL}/GetEnterpriseContracts/${enterpriseId}`
  //   );
  // }

  // getEnterpriseById(enterpriseId: number): Observable<EnterpriseViewModel> {
  //   return this.httpClient.get<EnterpriseViewModel>(
  //     `${this.REQUEST_URL}/${enterpriseId}`
  //   );
  // }

  // updateEnterpriseContract(data: FormData): Observable<Enterprise> {
  //   return this.httpClient.put<Enterprise>(
  //     `${this.REQUEST_URL}/UpdateEnterpriseContract`,
  //     data
  //   );
  // }

  // downloadFile(
  //   idEnterprise: number,
  //   idDirectory: number,
  //   fileName: string
  // ): Observable<Blob> {
  //   return this.httpClient
  //     .get<Blob>(
  //       `${this.REQUEST_URL}/DownloadFile/${idEnterprise}/${idDirectory}/${fileName}`,
  //       {
  //         responseType: 'blob' as 'json',
  //       }
  //     )
  //     .pipe(catchError(this.parseErrorBlob));
  // }

  // parseErrorBlob(err: HttpErrorResponse): Observable<any> {
  //   const reader: FileReader = new FileReader();

  //   const obs = Observable.create((observer: any) => {
  //     reader.onloadend = (e) => {
  //       observer.error(JSON.parse(reader!.result!.toString()));
  //       observer.complete();
  //     };
  //   });
  //   reader.readAsText(err.error);
  //   return obs;
  // }

  // deleteContract(idEnterprise: number, ContractId: number, NumberId: string) {
  //   return this.httpClient.delete(
  //     `${this.REQUEST_URL}/DeleteContract/${idEnterprise}/${ContractId}/${NumberId}`
  //   );
  // }

  // getEnterpriseStreaming(
  //   enterpriseId: number
  // ): Observable<GetEnterpriseStreaming> {
  //   return this.httpClient.get<GetEnterpriseStreaming>(
  //     `${this.REQUEST_URL}/streaming/${enterpriseId}`
  //   );
  // }

  // updateEnterpriseStreaming(model: any): Observable<Error> {
  //   return this.httpClient.put<Error>(`${this.REQUEST_URL}/streaming`, model);
  // }

  // createEnterprisePin(data: FormData): Observable<any> {
  //   return this.httpClient.post<any>(`${this.REQUEST_URL}/pin`, data);
  // }

  // updateEnterprisePin(data: FormData): Observable<any> {
  //   return this.httpClient.put<any>(`${this.REQUEST_URL}/pin`, data);
  // }

  // deleteEnterprisePin(data: any): Observable<any> {
  //   return this.httpClient.put<any>(`${this.REQUEST_URL}/delete/pin`, data);
  // }

  // updateEnterpriseSystem(data: any): Observable<any> {
  //   return this.httpClient.put<any>(`${this.REQUEST_URL}/system`, data);
  // }

  // getEnterpriseSystem(enterpriseId: number): Observable<GetEnterpriseSystem> {
  //   return this.httpClient.get<GetEnterpriseSystem>(
  //     `${this.REQUEST_URL}/system/${enterpriseId}`
  //   );
  // }

  // getListShifts(
  //   enterpriseId: number,
  //   idHeadquarter: number
  // ): Observable<GetEnterpriseShifts> {
  //   return this.httpClient.get<GetEnterpriseShifts>(
  //     `${this.REQUEST_URL}/shifts/${enterpriseId}/0`
  //   );
  // }
}
