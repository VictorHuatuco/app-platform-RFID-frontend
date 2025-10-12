import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ErrorMessageComponent } from '../../../shared/components/messages/error-message/error-message.component';
import { AppConstants } from '../../../shared/constants/app.contants';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from '../../../services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    ErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true;
  showRecovery: boolean = false;
  showModal: boolean = false;
  showError: boolean = false;
  messageError: string;
  public recoveryEmail: string = '';
  fb = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      document.body.classList.add('bg-loaded');
    }, 50);
    // localStorage.clear();
    // var token = localStorage.getItem(AppConstants.Storage.ACCESS_TOKEN);
    // if (token) {
    //   this.authService.tokenValidate(token).subscribe({
    //     next: (response) => {
    //       if (response != null) {
    //         console.log('entro aqui y se ejecuta');
    //         this.router.navigate(['home/dashboard']);
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error token', error.error);
    //     },
    //   });
    // } else {
    //   localStorage.clear();
    //   //  this.authService.handleRedirectCallback();
    // }

    setTimeout(() => {
      document.body.classList.add('bg-loaded');
    }, 50);
  }

  async login() {
    // if (this.loginForm.valid) {
    //   this.authService.loginCustomer(this.loginForm.value).subscribe({
    //     next: async (response) => {
    //       console.log(response);
    //       if (response.error == null) {
    //         try {
    //           localStorage.setItem(
    //             AppConstants.Storage.ACCESS_TOKEN,
    //             response.token
    //           );
    //           localStorage.setItem(
    //             AppConstants.Storage.EMAIL,
    //             this.loginForm.get('username')?.value
    //           );
    //           localStorage.setItem(AppConstants.Storage.ROLE, 'admin');
    //           // localStorage.setItem(
    //           //   AppConstants.Storage.ROLE,
    //           //   response.userType
    //           // );
    //           localStorage.setItem(
    //             AppConstants.Storage.ENTERPRISE,
    //             response.enterprise
    //           );
    //           localStorage.setItem(
    //             AppConstants.Storage.SYSTEMS,
    //             response.systems
    //           );
    //           //localStorage.setItem(AppConstants.Storage.MENU, user.menu);
    //           localStorage.setItem(
    //             AppConstants.Storage.NAME,
    //             response.fullName
    //           );
    //           this.snackbarService.show('Inicio de sesión exitoso', 'success');
    //           this.router.navigate(['global-systems']);
    //         } catch (err) {
    //           console.log('Error during email validation:', err);
    //           this.snackbarService.show(
    //             'Error durante la validación del correo',
    //             'error'
    //           );
    //         }
    //       } else {
    //         console.log(response.error);
    //         this.snackbarService.show(response.error.message, 'error');
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error token', error.errors);
    //     },
    //   });
    // } else {
    //   console.log('Formulario inválido');
    //   this.loginForm.markAllAsTouched();
    //   this.snackbarService.show('Por favor rellene todos los campos', 'error');
    // }
  }

  handlePasswordRecovery(event: Event): void {
    event.preventDefault();
    this.showLogin = false;
    this.showRecovery = true;
  }

  handleConfirm(): void {
    this.showLogin = true;
    this.showRecovery = false;
    this.showModal = false;
  }

  handleSendRecoveryMail() {
    // if (!this.recoveryEmail) {
    //   // alert('Por favor, ingresa un correo válido.');
    //   this.snackbarService.show(
    //     'Por favor, ingresa un correo válido.',
    //     'error'
    //   );
    //   return;
    // }
    // console.log('📤 Enviando correo a:', this.recoveryEmail);
    // // Llamar al servicio de autenticación para enviar el correo de recuperación
    // this.authService.sendRecoveryEmail(this.recoveryEmail).subscribe({
    //   next: (response) => {
    //     if (response.code == 200) {
    //       this.showModal = true;
    //     }
    //   },
    //   error: (err) => {
    //     console.error('❌ Error al enviar el correo:', err);
    //     // alert('Hubo un error al enviar el correo. Inténtalo de nuevo.');
    //     this.snackbarService.show(
    //       'Hubo un error al enviar el correo. Inténtalo de nuevo.',
    //       'error'
    //     );
    //   },
    // });
  }

  handleReturnToLogin(event: Event) {
    event.preventDefault();
    this.showLogin = true;
    this.showRecovery = false;
    this.showModal = false;
  }
}
