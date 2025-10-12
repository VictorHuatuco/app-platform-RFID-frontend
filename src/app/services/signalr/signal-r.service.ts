import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../../enviroments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private connectionEstablished = new BehaviorSubject<boolean>(false);
  public connectionEstablished$ = this.connectionEstablished.asObservable();

  constructor() {}

  public startConnection(): Promise<void> {
    return fetch(environment.signalr)
      .then(res => res.json())
      .then(info => {
        this.hubConnection = new HubConnectionBuilder()
          .withUrl(info.url, {
            accessTokenFactory: () => info.accessToken
          })
          .withAutomaticReconnect()
          .build();
  
        return this.hubConnection.start()
          .then(() => {
            console.log('✅ SignalR conectado');
            this.connectionEstablished.next(true);
          });
      })
      .catch(err => {
        console.error('❌ Error al iniciar conexión SignalR', err);
        this.connectionEstablished.next(false);
      });
  }
  

  public stopConnection(): Promise<void> {
    return this.hubConnection
      .stop()
      .then(() => {
        console.log('SignalR Connection Stopped');
        this.connectionEstablished.next(false);
      })
      .catch(err => {
        console.error('Error while stopping SignalR connection: ', err);
      });
  }

  public invoke(methodName: string, ...args: any[]): Promise<any> {
    return this.hubConnection.invoke(methodName, ...args);
  }

  public on(methodName: string, callback: (...args: any[]) => void): void {
    this.hubConnection.on(methodName, callback);
  }

  public off(methodName: string): void {
    this.hubConnection.off(methodName);
  }
} 