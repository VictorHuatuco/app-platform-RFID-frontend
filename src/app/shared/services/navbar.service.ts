import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private titleSource = new BehaviorSubject<string>('Default Title');
  currentTitle = this.titleSource.asObservable();

  changeTitle(title: string) {
    this.titleSource.next(title);
  }
}
