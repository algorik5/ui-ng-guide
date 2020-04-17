import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormStaticRoutingModule } from './form-static-routing.module';
import { FormStaticComponent } from './form-static.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [FormStaticComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    FormStaticRoutingModule
  ]
})
export class FormStaticModule { }
