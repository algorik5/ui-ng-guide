import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormReadonlyRoutingModule } from './form-readonly-routing.module';
import { FormReadonlyComponent } from './form-readonly.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [FormReadonlyComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    FormReadonlyRoutingModule
  ]
})
export class FormReadonlyModule { }
