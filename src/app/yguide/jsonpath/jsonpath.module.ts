import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonpathRoutingModule } from './jsonpath-routing.module';
import { JsonpathComponent } from './jsonpath.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [JsonpathComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    JsonpathRoutingModule
  ]
})
export class JsonpathModule { }
