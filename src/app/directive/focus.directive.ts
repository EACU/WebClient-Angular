import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[tmFocus]' })

export class MyFocusDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
    }
}
