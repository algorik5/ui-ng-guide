import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [DashboardComponent, DashboardFormComponent, DashboardViewComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
