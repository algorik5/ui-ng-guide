import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    FormRoutingModule
  ]
})
export class FormModule { 
  code = "let i=0";
}
