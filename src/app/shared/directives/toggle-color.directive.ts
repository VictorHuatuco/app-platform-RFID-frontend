import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[toggleColor]'
})
export class ToggleColorDirective {
  @Input('circle') circleColor: string;
  @Input('bar') barColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const circle = this.el.nativeElement.querySelector('.mat-slide-toggle-thumb');
    const bar = this.el.nativeElement.querySelector('.mat-slide-toggle-bar');

    this.renderer.setStyle(circle, 'background-color', this.circleColor);
    this.renderer.setStyle(bar, 'background-color', this.barColor);
  }
}
