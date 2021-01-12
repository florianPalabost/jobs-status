import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[toggle]'
})
export class ToggleDirective {

  private _shown = false;

  constructor(private el: ElementRef) {
    this.el.nativeElement.addEventListener('click', () => {
      this._shown = !this._shown;
      this.toggle();
    });

  }

  toggle() {
    const inputDom = document.querySelector('.password');
    const iconNode = this.el.nativeElement.firstChild;

    if (this._shown) {
      inputDom.setAttribute('type', 'text');
      iconNode.setAttribute('class', 'bi bi-eye');
    } else {
      inputDom.setAttribute('type', 'password');
      iconNode.setAttribute('class', 'bi bi-eye-slash');

    }
  }
}
