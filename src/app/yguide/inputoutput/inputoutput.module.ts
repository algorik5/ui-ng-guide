import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputoutputRoutingModule } from './inputoutput-routing.module';
import { InputoutputComponent } from './inputoutput.component';
import { InputoutputChildComponent } from './inputoutput-child/inputoutput-child.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [InputoutputComponent, InputoutputChildComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    InputoutputRoutingModule
  ]
})
export class InputoutputModule { }
