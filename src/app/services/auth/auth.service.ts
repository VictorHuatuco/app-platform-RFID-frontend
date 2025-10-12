import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { GetUserValidate } from '../../models/auth/getUserValidate';
import { ErrorModel } from '../../models/error';
import { TokenPayload } from '../../models/auth/tokenPayload';
import { AppConstants } from '../../shared/constants/app.contants';
import { AuthLogin } from '../../models/auth/login';
import { AuthUser } from '../../models/auth/authUser';
import { AuthLoginCustomer } from '../../models/auth/loginCustomer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isMsalInitialized: boolean = false;
  private POST_ENDPOINT: string = 'Auth';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  constructor(private http: HttpClient) {}

  //   login(formData: FormData): Observable<AuthLogin> {
  //     return this.http.post<AuthLogin>(`${this.REQUEST_URL}/login`, formData);
  //   }

  //   loginCustomer(formData: FormData): Observable<AuthLoginCustomer> {
  //     return this.http.post<AuthLoginCustomer>(`${this.REQUEST_URL}/login/customer`, formData);
  //   }

  //   async handleLoginResponse(loginResponse: any): Promise<any> {
  //     var res = 400;
  //     if (loginResponse!.account != null) {
  //         var email = loginResponse!.account.username;

  //         try {
  //             var emailValidate = await firstValueFrom(this.emailValidate(email));
  //             res = emailValidate.error.code;
  //             if (res != 200) {
  //                 return res;
  //             } else {
  //                 var payload = new TokenPayload();
  //                 payload.email = email;
  //                 payload.token = loginResponse!.account.idToken!.trim();
  //                 payload.expiredAt = this.convertUnixTimestampToDate(loginResponse!.account.idTokenClaims!.exp!);
  //                 var save = await firstValueFrom(this.saveToken(payload));
  //                 if (save.code == 200) {
  //                     localStorage.setItem(AppConstants.Storage.ACCESS_TOKEN, payload.token);
  //                     localStorage.setItem(AppConstants.Storage.EMAIL, email);
  //                     localStorage.setItem(AppConstants.Storage.ROLE, emailValidate.data.role);
  //                     localStorage.setItem(AppConstants.Storage.MENU, emailValidate.data.menu);
  //                     localStorage.setItem(AppConstants.Storage.NAME, loginResponse!.account.name!);
  //                 } else {
  //                     res = 400;
  //                 }
  //             }
  //         } catch (err) {
  //           console.log("Error during email validation:", err);
  //           res = 400;
  //         }
  //     } else {
  //         console.log("No account found in login response. Clearing local storage.");
  //         localStorage.clear();
  //     }
  //     return res;
  // }

  logout() {
    localStorage.clear();
  }

  //   emailValidate(email: string): Observable<GetUserValidate> {
  //     return this.http.post<GetUserValidate>(`${this.REQUEST_URL}/email-validate`, { email });
  //   }

  //   tokenValidate(token: string): Observable<number> {
  //     return this.http.post<number>(`${this.REQUEST_URL}/token-validate`, {token});
  //   }

  //   getToken(token: string): Observable<AuthUser> {
  //     return this.http.get<AuthUser>(`${this.REQUEST_URL}/token/${token}`);
  //   }

  //   saveToken(payload: TokenPayload): Observable<ErrorModel> {
  //     return this.http.post<ErrorModel>(`${this.REQUEST_URL}/token`, payload);
  //   }

  //   convertUnixTimestampToDate(exp: number): string {
  //     // Convertir Unix timestamp a Date en milisegundos
  //     var date = new Date(exp * 1000); // `exp` está en segundos, pero `Date` usa milisegundos

  //     // Formatear la fecha a yyyy-MM-dd HH:mm:ss
  //     var year = date.getUTCFullYear();
  //     var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  //     var day = ('0' + date.getUTCDate()).slice(-2);
  //     var hours = ('0' + date.getUTCHours()).slice(-2);
  //     var minutes = ('0' + date.getUTCMinutes()).slice(-2);
  //     var seconds = ('0' + date.getUTCSeconds()).slice(-2);

  //     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   }

  //   sendRecoveryEmail(email: string): Observable<any> {
  //     return this.http.post(`${this.REQUEST_URL}/recover-password`, { email });
  //   }
}
