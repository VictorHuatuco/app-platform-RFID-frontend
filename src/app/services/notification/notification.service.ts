import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { getRoleList } from '../../models/role/getRoleList';
import { GetNotifications } from '../../models/notification/getNotifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: HttpClient
  ) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  private POST_ENDPOINT: string = 'Notification';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  pag(filter: any): Observable<GetNotifications> {
    let httpParams = new HttpParams({
      fromObject: filter,
    });
    return this.httpClient.get<GetNotifications>(`${this.REQUEST_URL}/pag`, { params: httpParams });
  }

  public showNotification(titulo: string, redirect: string, opciones?: NotificationOptions): void {
    try {
      if (Notification.permission === 'granted') {
        const notificacion = new Notification(titulo, opciones);
        notificacion.onclick = () => {
          // Redirigir a una URL específica
          window.open(window.location.origin+"/"+redirect); // Abre en una nueva pestaña
          notificacion.close(); // Cierra la notificación
        };
        console.log("Notificación enviada con éxito.");
      } else {
        console.log('Permiso para notificaciones no concedido.');
      }
    } catch (error) {
      console.error("Error al mostrar la notificación:", error);
    }
  }
}
