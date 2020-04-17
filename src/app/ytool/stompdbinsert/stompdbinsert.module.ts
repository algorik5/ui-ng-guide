import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompdbinsertRoutingModule } from './stompdbinsert-routing.module';
import { StompdbinsertComponent } from './stompdbinsert.component';
import { StompdbinsertFormComponent } from './stompdbinsert-form/stompdbinsert-form.component';
import { StompdbinsertTableschemaComponent } from './stompdbinsert-tableschema/stompdbinsert-tableschema.component';
import { StompdbinsertTabledataComponent } from './stompdbinsert-tabledata/stompdbinsert-tabledata.component';
import { StompdbinsertDebugjsonviewComponent } from './stompdbinsert-debugjsonview/stompdbinsert-debugjsonview.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [StompdbinsertComponent, StompdbinsertFormComponent, StompdbinsertTableschemaComponent, StompdbinsertTabledataComponent, StompdbinsertDebugjsonviewComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    StompdbinsertRoutingModule
  ],
})
export class StompdbinsertModule { }
