import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[OnlyText]'
})
export class OnlyTextDirective {

    oldValue: string;
    newValue: string;
    valido: any
    @Input()
    textInput: string;

    constructor(private element: ElementRef, private control: NgControl) { }

    @HostListener('keypress', ['$event'])
    onKeypressHandler(event: any) {
        if (this.control.control.value == " ") {
            this.control.control.setValue(this.control.control.value.toString().trim());
        }
    }

    @HostListener('keydown', ['$event'])
    onkeydown(event: any) {
        this.oldValue = event.target.value;
    }

    @HostListener('input', ['$event'])
    oninput(event: any) {
        if (this.control.control.value == " ") {
            this.control.control.setValue(this.control.control.value.toString().trim());
        }
    }
}