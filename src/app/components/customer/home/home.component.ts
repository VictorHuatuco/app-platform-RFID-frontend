import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { environment } from '../../../../enviroments/environment';
import { NotificationService } from '../../../services/notification/notification.service';
import { FooterComponent } from '../../../shared/components/layout/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';
import { AppConstants } from '../../../shared/constants/app.contants';
import { NavbarService } from '../../../shared/services/navbar.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../shared/paginator-intl-es';
import { AuthService } from '../../../services/auth/auth.service';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

interface MenuItem {
  name: string;
  icon?: string;
  route?: string;
  open?: boolean;
  title?: string;
  menuModuleId?: number;
  children?: MenuItem[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatListModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }, // Aquí lo aplicas
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSidenavOpen = false;
  isMobileView: boolean;
  headerTitle: string;
  public system: string;
  private hubConnection: signalR.HubConnection;
  // menuItems: MenuItem[] = [];
  menuItems: MenuItem[] = [
    {
      name: 'Monitoreo de bahías',
      open: false,
      route: '/home/bay-monitoring',
      icon: 'dashboard',
      // children: [
      //   {
      //     name: 'General',
      //     route: '/home/dashboard/general',
      //     title: 'Dashboard > General',
      //     menuModuleId: 1,
      //   },
      //   {
      //     name: 'Avanzado',
      //     route: '/home/dashboard/advanced',
      //     title: 'Dashboard > Avanzado',
      //     menuModuleId: 2,
      //   },
      //   {
      //     name: 'Conteo de personas',
      //     route: '/home/dashboard/people-counting',
      //     title: 'Dashboard > Conteo de personas',
      //     menuModuleId: 3,
      //   },
      //   {
      //     name: 'Mapas de Calor & Engage',
      //     route: '/home/dashboard/heat-maps-and-engage',
      //     title: 'Dashboard > Mapas de Calor & Engage',
      //     menuModuleId: 4,
      //   },
      //   {
      //     name: 'Gestión de filas',
      //     route: '/home/dashboard/queue-management',
      //     title: 'Dashboard > Gestión de filas',
      //     menuModuleId: 5,
      //   },
      //   {
      //     name: 'Customer Journey',
      //     route: '/home/dashboard/customer-journey',
      //     title: 'Dashboard > Customer Journey',
      //     menuModuleId: 6,
      //   },
      //   {
      //     name: 'Conversión de Ventas',
      //     route: '/home/dashboard/sales-conversion',
      //     title: 'Dashboard > Conversión de Ventas',
      //     menuModuleId: 7,
      //   },
      //   {
      //     name: 'Marketing ROI',
      //     route: '/home/dashboard/marketing-ROI',
      //     title: 'Dashboard > Marketing ROI',
      //     menuModuleId: 8,
      //   },
      //   {
      //     name: 'Análisis Comercial',
      //     route: '/home/dashboard/commercial-analysis',
      //     title: 'Dashboard > Análisis Comercial',
      //     menuModuleId: 9,
      //   },
      //   {
      //     name: 'Seguridad',
      //     route: '/home/dashboard/security',
      //     title: 'Dashboard > Seguridad',
      //     menuModuleId: 10,
      //   },
      //   {
      //     name: 'Alertas y Notificaciones',
      //     route: '/home/dashboard/alerts-and-notifications',
      //     title: 'Dashboard > Alertas y Notificaciones',
      //     menuModuleId: 11,
      //   },
      // ],
    },
    {
      name: 'Historial de mantenimiento',
      open: false,
      route: '/home/maintenance-history',
      icon: 'history',
    },
    {
      name: 'Historial de alertas',
      route: '/home/alert-history',
      open: false,
      icon: 'history',
    },
  ];
  logo: string = '';

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.checkViewport();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderTitle(event.urlAfterRedirects);
      }
    });
    // identificar en que sistema estamos
  }

  ngOnInit() {
    // this.changeTheme(localStorage.getItem('system')!);
    this.loadSytem();

    // const theme = this.themeService.getTheme();
    // this.logo = theme.logo;
    // const permissions = JSON.parse(localStorage.getItem(AppConstants.Storage.MENU)!);
    // this.menuItems = this.filterMenu(this.menuItems, permissions);
    /*
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hub + '/notificationHub', {
        withCredentials: true
      })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Conectado al Hub de SignalR'))
      .catch(err => console.error('Error al conectar al Hub:', err));

    this.hubConnection.on('ReceiveNotification', (data) => {
      if(data){
        console.log('Notificación recibida:', data);
        this.showNotification(JSON.parse(data));
      }
    });*/
  }

  // changeTheme(systemName: string) {
  //   if (systemName === 'TRADE+') {
  //     this.themeService.setTheme({
  //       primaryColor: '#d32f2f',
  //       menuBackground: '#739E97',
  //       menuTextColor: 'white',
  //       logo: 'assets/img/logo-Trade-white.png',
  //     });
  //   } else if (systemName === 'FLOW+') {
  //     this.themeService.setTheme({
  //       primaryColor: '#00796b',
  //       menuBackground: '#28398D',
  //       menuTextColor: 'white',
  //       logo: 'assets/img/logo-Flow-white.png',
  //     });
  //   } else if (systemName === 'INSIGHT+') {
  //     this.themeService.setTheme({
  //       primaryColor: '#303f9f',
  //       menuBackground: '#6D51A0',
  //       menuTextColor: 'white',
  //       logo: 'assets/img/logo-Insight-white.png',
  //     });
  //   }
  //   this.logo = this.themeService.getTheme().logo;
  // }

  loadSytem() {
    this.system = localStorage.getItem('system')!;
    this.themeService.changeTheme(this.system);
    // this.menuItems = this.menuService.getMenu(this.system);
  }

  goToSettings() {
    this.router.navigate(['/home/setup']);
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
        // this.authService.logout();
        // this.router.navigate(['briq']);
        // this.authService.logout();
        this.themeService.changeTheme('BRIQ');
        this.router.navigate(['']);
      }
    });
  }

  filterMenu(menuItems: MenuItem[], permissions: any[]): MenuItem[] {
    return menuItems
      .map((item) => {
        if (item.children) {
          // Si tiene hijos, filtrar los hijos
          const filteredChildren = item.children.filter((child) =>
            this.hasPermission(child.menuModuleId!, permissions)
          );

          // Si después del filtrado, el menú padre no tiene hijos, no lo mostramos
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
          return null;
        } else {
          // Si no tiene hijos, simplemente verificar si tiene permisos
          return this.hasPermission(item.menuModuleId!, permissions)
            ? item
            : null;
        }
      })
      .filter((item) => item !== null); // Eliminar ítems nulos
  }

  hasPermission(menuModuleId: number, permissions: any[]): boolean {
    const permission = permissions.find((p) => p.MenuModuleId === menuModuleId);
    return (
      permission &&
      (permission.Permission === 'w' || permission.Permission === 'r')
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 600;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onSidenavClose() {
    this.isSidenavOpen = false;
  }

  onMenuItemClick(route: string) {
    this.navigate(route);
  }

  navigate(route: string) {
    if (route) {
      this.router.navigate([route]).then(() => {
        if (this.isMobileView) {
          this.onSidenavClose();
        }
      });
      this.updateHeaderTitle(route);
    }
  }

  onActivate() {
    this.updateHeaderTitle(this.router.url);
  }

  updateHeaderTitle(url: string) {
    const findTitle = (items: MenuItem[]): string => {
      for (const item of items) {
        if (item.route && url.includes(item.route)) {
          const Title = item.title ?? '';
          if (Title) {
            this.navbarService.changeTitle(Title);
          }
          return Title;
        }
        if (item.children) {
          const childTitle = findTitle(item.children);
          if (childTitle) {
            this.navbarService.changeTitle(childTitle);
            return childTitle;
          }
        }
      }
      return '';
    };

    this.headerTitle = findTitle(this.menuItems);
  }

  toggleSubmenu(item: MenuItem) {
    this.menuItems.forEach((menuItem) => {
      if (menuItem !== item && menuItem.children) {
        menuItem.open = false;
      }
    });

    item.open = !item.open;
  }

  isActiveSubmenu(item: MenuItem): boolean {
    if (item.children) {
      for (const child of item.children) {
        if (this.router.url.includes(child.route!)) {
          return true;
        }
      }
    }
    return false;
  }

  showNotification(data: any) {
    this.notificationService.showNotification(data.Title, data.Redirect, {
      body: data.Message,
      icon: '', // 'assets/icon.png' // Asegúrate de tener un icono en esta ruta
      requireInteraction: true,
    });
  }
}
