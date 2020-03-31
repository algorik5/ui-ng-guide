import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboardv2RoutingModule } from './dashboardv2-routing.module';
import { Dashboardv2Component } from './dashboardv2.component';


@NgModule({
  declarations: [Dashboardv2Component],
  imports: [
    CommonModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
