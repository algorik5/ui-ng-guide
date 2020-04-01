import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboardv2RoutingModule } from './dashboardv2-routing.module';
import { Dashboardv2Component } from './dashboardv2.component';
import { ViewMaxComponent } from './view-max.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { ViewTableComponent } from './view-table.component';
import { ViewAtopComponent } from './view-atop.component';
import { ViewAleftComponent } from './view-aleft.component';
import { ViewArightComponent } from './view-aright.component';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [Dashboardv2Component, ViewMaxComponent, ViewTableComponent, ViewAtopComponent, ViewAleftComponent, ViewArightComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
    AcompoModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
