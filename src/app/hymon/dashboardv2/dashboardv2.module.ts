import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboardv2RoutingModule } from './dashboardv2-routing.module';
import { Dashboardv2Component } from './dashboardv2.component';
import { ViewAtopComponent } from './view-atop.component';
import { ViewAleftComponent } from './view-aleft.component';
import { ViewArightComponent } from './view-aright.component';
import { AcompoModule } from 'src/app/acompo/acompo.module';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [Dashboardv2Component, ViewAtopComponent, ViewAleftComponent, ViewArightComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    AcompoModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
