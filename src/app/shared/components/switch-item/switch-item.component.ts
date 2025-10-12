import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './switch-item.component.html',
  styleUrl: './switch-item.component.css',
})
export class SwitchItemComponent {
  @Input()
  public label: string = '';

  @Input() public switchValue: boolean = true;

  @Output()
  public switchValueEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onSwitchChange(event: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.switchValue = isChecked;
    this.switchValueEmitter.emit(this.switchValue);
  }
}
