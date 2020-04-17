import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblocalRoutingModule } from './dblocal-routing.module';
import { DblocalComponent } from './dblocal.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [DblocalComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DblocalRoutingModule
  ]
})
export class DblocalModule { }
