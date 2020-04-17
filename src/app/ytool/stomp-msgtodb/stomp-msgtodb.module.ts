import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompMsgtodbRoutingModule } from './stomp-msgtodb-routing.module';
import { StompMsgtodbComponent } from './stomp-msgtodb.component';
import { StompMsgtodbFormComponent } from './stomp-msgtodb-form/stomp-msgtodb-form.component';
import { StompMsgtodbStatsComponent } from './stomp-msgtodb-stats/stomp-msgtodb-stats.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [StompMsgtodbComponent, StompMsgtodbFormComponent, StompMsgtodbStatsComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    StompMsgtodbRoutingModule
  ]
})
export class StompMsgtodbModule { }
