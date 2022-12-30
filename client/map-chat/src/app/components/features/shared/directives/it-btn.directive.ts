import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ItBtn]'
})
export class ItBtnDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.transitionDuration = '300ms';
  }

  @HostListener('mouseenter') scaleUpIcon() {
    this.el.nativeElement.style.scale = '1.3';
  }

  @HostListener('mouseleave') scaleDownIcon() {
    this.el.nativeElement.style.scale = '1';
  }

  @HostListener('mousedown') mouseDown() {
    this.el.nativeElement.style.scale = '0.7';
  }

  @HostListener('mouseup') mouseUp() {
    this.scaleDownIcon();
  }
}
