import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorAuthenticateInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (401 == err.status ||  403 == err.status) {
            // auto logout if 401 or 403 response returned from api
            localStorage.clear();
            this.router.navigate(['/briq']);
        }

        /*const error = err.error?.message || err.statusText;*/
       // console.error(err);
        return throwError(() => err);
    }))
}
}
