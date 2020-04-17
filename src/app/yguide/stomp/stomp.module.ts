import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompRoutingModule } from './stomp-routing.module';
import { StompComponent } from './stomp.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [StompComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    StompRoutingModule
  ]
})
export class StompModule { }
