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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { ViewTableComponent } from './view-table.component';


@NgModule({
  declarations: [Dashboardv2Component, AtopComponent, AleftComponent, ArightComponent, ViewMaxComponent, ViewTopComponent, ViewTrendComponent, ViewTableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
