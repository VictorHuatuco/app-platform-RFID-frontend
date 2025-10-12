// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AppConstants } from '../constants/app.contants';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     _next: ActivatedRouteSnapshot,
//     _state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const isAuthenticated = localStorage.getItem(
//       AppConstants.Storage.ACCESS_TOKEN
//     );
//     console.log(isAuthenticated);
//     if (isAuthenticated) {
//       return true;
//     } else {
//       this.router.navigate(['/briq']);
//       return false;
//     }
//   }
// }
