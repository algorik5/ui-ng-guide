import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboardv2RoutingModule } from './dashboardv2-routing.module';
import { Dashboardv2Component } from './dashboardv2.component';
import { AtopComponent } from './atop.component';
import { AleftComponent } from './aleft.component';
import { ArightComponent } from './aright.component';
import { ViewMaxComponent } from './view-max.component';
import { ViewTopComponent } from './view-top.component';
import { ViewTrendComponent } from './view-trend.component';


@NgModule({
  declarations: [Dashboardv2Component, AtopComponent, AleftComponent, ArightComponent, ViewMaxComponent, ViewTopComponent, ViewTrendComponent],
  imports: [
    CommonModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
