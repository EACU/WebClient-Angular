import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFocusDirective } from '../../app/directive/focus.directive';
import { SpinnerComponent } from '../../app/spinner/spinner.component';

@NgModule({
  imports:      [CommonModule],
  declarations: [MyFocusDirective, SpinnerComponent],
  exports:      [MyFocusDirective, SpinnerComponent],
  providers:    []
})
export class SharedModule { }
