import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonviewRoutingModule } from './jsonview-routing.module';
import { JsonviewComponent } from './jsonview.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';

@NgModule({
  declarations: [JsonviewComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    JsonviewRoutingModule
  ]
})
export class JsonviewModule { }
