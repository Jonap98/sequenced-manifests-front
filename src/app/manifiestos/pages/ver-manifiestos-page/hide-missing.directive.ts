import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appHideMissing]'
})
export class HideMissingDirective {

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('error')
  private onError() {
    this.element.nativeElement.src = 'assets/objects.png';
  }
}
