import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next(message);
  }

  clearMessages() {
    this.subject.next(true);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
