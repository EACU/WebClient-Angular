import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFocusDirective } from '../../app/directive/focus.directive';

@NgModule({
  imports:      [CommonModule],
  declarations: [MyFocusDirective],
  exports:      [MyFocusDirective],
  providers:    []
})
export class SharedModule { }
