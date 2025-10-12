import { Directive, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatFormField } from '@angular/material';

@Directive({
  selector: '[adOutlineBorder]',
})
export class OutlineBorderDirective implements AfterViewInit {
  @Input('input') adOutlineBorder: MatFormField;
  @Input('color') outlineColor;
  @Input() outlineRadius: number = 10;
  @Input() outlineWidth: number = 3;

  constructor() {}
  ngAfterViewInit(): void {
    console.log("element MatFormField",this.adOutlineBorder);
    console.log("element color",this.outlineColor);
    console.log("native element",this.adOutlineBorder._connectionContainerRef.nativeElement);
    const element = this.adOutlineBorder._connectionContainerRef.nativeElement;
    var labelColor = element.querySelector('.mat-form-field-label .mat-focused') as HTMLElement;
    var backgroundLine = element.querySelector('.mat-form-field-appearance-legacy .mat-form-field-underline') as HTMLElement;
    console.log("element directive",element);
    labelColor.style.color = `${this.outlineColor}`;
    backgroundLine.style.borderColor = `${this.outlineColor}`;
   // element.style.borderRadius = `${this.outlineRadius}px`;
  }
}
