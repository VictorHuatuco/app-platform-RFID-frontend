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
// export class AuthCustomerGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const isAuthenticated = !!localStorage.getItem(
//       AppConstants.Storage.ACCESS_TOKEN
//     );

//     if (state.url === '/login' && isAuthenticated) {
//       this.router.navigate(['/global-systems']);
//       return false;
//     }

//     if (!isAuthenticated && state.url !== '/login' && state.url !== '/') {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     return true;
//   }
// }
