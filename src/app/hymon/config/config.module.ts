import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { ViewAtopComponent } from './view-atop.component';
import { ViewArightComponent } from './view-aright.component';
import { ViewTableschemaComponent } from './view-tableschema.component';
import { ViewLocalstorageComponent } from './view-localstorage.component';
import { ViewMsgstatusComponent } from './view-msgstatus.component';
import { ViewTablestatusComponent } from './view-tablestatus.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [ConfigComponent, ViewAtopComponent, ViewArightComponent, ViewTableschemaComponent, ViewLocalstorageComponent, ViewMsgstatusComponent, ViewTablestatusComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
