import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { DashboardViewServerComponent } from './dashboard-view-server/dashboard-view-server.component';
import { DashboardViewProcessComponent } from './dashboard-view-process/dashboard-view-process.component';
import { DashboardViewAppComponent } from './dashboard-view-app/dashboard-view-app.component';
import { DashboardViewSummaryComponent } from './dashboard-view-summary/dashboard-view-summary.component';


@NgModule({
  declarations: [DashboardComponent, DashboardFormComponent, DashboardViewServerComponent, DashboardViewProcessComponent, DashboardViewAppComponent, DashboardViewSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
