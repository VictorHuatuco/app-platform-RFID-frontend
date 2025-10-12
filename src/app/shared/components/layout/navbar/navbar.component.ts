import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { NavbarService } from '../../../services/navbar.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { AppConstants } from '../../../constants/app.contants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navbarTitle: string;
  @Output() toggleSidenav = new EventEmitter<void>();
  name: string = 'Usuario 1';
  photo: string;
  role: string;
  isSidenavOpen: boolean = false;
  isMobileView: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private navbarService: NavbarService,
    private confirmDialogService: ConfirmDialogService
  ) {
    // this.name = localStorage.getItem('name')?.toString()!;
    // this.photo = localStorage.getItem('photo')?.toString()!;
    // this.role = localStorage.getItem('role')?.toString()!;
    this.checkViewport();
  }

  ngOnInit(): void {
    this.navbarService.currentTitle.subscribe((title) => {
      this.navbarTitle = title;
    });
  }

  profile() {
    //this.router.navigate(['/home/admin/user/profile']);
  }

  notifications() {
    // this.router.navigate(['/home/notification']);
  }

  logout() {
    const dialogData = {
      title: '',
      message: `¿Está seguro de cerrar sesión?`,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    };

    this.confirmDialogService.confirm(dialogData).subscribe((result) => {
      if (result) {
        if (localStorage.getItem(AppConstants.Storage.ENTERPRISE)) {
          this.authService.logout();
          this.router.navigate(['']);
        } else {
          // this.authService.logout();
          this.router.navigate(['briq']);
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 600;
  }
}
