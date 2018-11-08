import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFocusDirective } from '../../app/directive/focus.directive';
import { UserService } from '../services/user.service';

@NgModule({
  imports:      [CommonModule],
  declarations: [MyFocusDirective],
  exports:      [MyFocusDirective],
  providers:    [UserService]
})
export class SharedModule { }
