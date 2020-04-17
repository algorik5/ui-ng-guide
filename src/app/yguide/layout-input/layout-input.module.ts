import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutInputRoutingModule } from './layout-input-routing.module';
import { LayoutInputComponent } from './layout-input.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [LayoutInputComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    LayoutInputRoutingModule
  ]
})
export class LayoutInputModule { }
