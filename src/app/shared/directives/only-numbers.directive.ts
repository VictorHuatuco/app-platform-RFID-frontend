import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[OnlyNumbers]'
})
export class OnlyNumbersDirective {
    constructor(private element: ElementRef) { }

    @HostListener('keypress', ['$event'])
    onKeypressHandler(event: any) {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
