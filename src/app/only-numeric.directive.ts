import { Directive,HostListener  } from '@angular/core';

@Directive({
  selector: '[appOnlyNumeric]'
})
export class OnlyNumericDirective {

  constructor() { }
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    // Allow only numeric characters (0-9) and special keys like Backspace, Delete, Arrow keys, etc.
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }
}
