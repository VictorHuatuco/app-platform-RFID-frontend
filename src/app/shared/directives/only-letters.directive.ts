import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[OnlyLetters]'
})
export class OnlyLettersDirective {

    @Input()
    textInput: string;

    constructor(private element: ElementRef) { }

    @HostListener('keypress', ['$event'])
    onKeypressHandler(event: any) {
        const charCode = (event.which) ? event.which : event.keyCode;

        var valueInputText = event.currentTarget.value;

        //Valid space between letter
        if (valueInputText == '' && charCode == 32) {
            return false;
        } else if (valueInputText.length != valueInputText.trim().length && charCode == 32) {
            return false;
        }

        if (charCode >= 65 && charCode <= 90) {
            return true;
        } else if (charCode >= 97 && charCode <= 122) {
            return true;
        } else if (charCode >= 160 && charCode <= 165) {
            return true;
        } else if (charCode == 39 || charCode == 44 || charCode == 103 ||
            charCode == 129 || charCode == 193 || charCode == 201 || charCode == 180 ||
            charCode == 205 || charCode == 211 || charCode == 218 || charCode == 225 ||
            charCode == 233 || charCode == 237 || charCode == 243 || charCode == 250 ||
            charCode == 241 || charCode == 209) {
            return true;
        } else if (charCode == 32) {
            return true;
        }

        return false;
    }

}
