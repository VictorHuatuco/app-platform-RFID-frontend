import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() message: string = 'Hay un error en su solicitud, vuelve a intentarlo más tarde';
}
