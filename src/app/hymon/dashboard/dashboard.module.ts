import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { DashboardServerCpuMaxComponent } from './dashboard-server-cpu-max/dashboard-server-cpu-max.component';
import { DashboardServerMemoryMaxComponent } from './dashboard-server-memory-max/dashboard-server-memory-max.component';
import { DashboardProcessCpuMaxComponent } from './dashboard-process-cpu-max/dashboard-process-cpu-max.component';
import { DashboardProcessMemoryMaxComponent } from './dashboard-process-memory-max/dashboard-process-memory-max.component';
import { DashboardServerCpuTopComponent } from './dashboard-server-cpu-top/dashboard-server-cpu-top.component';
import { DashboardServerMemoryTopComponent } from './dashboard-server-memory-top/dashboard-server-memory-top.component';
import { DashboardProcessCpuTopComponent } from './dashboard-process-cpu-top/dashboard-process-cpu-top.component';
import { DashboardProcessMemoryTopComponent } from './dashboard-process-memory-top/dashboard-process-memory-top.component';
import { DashboardServerCpuTrendComponent } from './dashboard-server-cpu-trend.component';
import { DashboardServerMemoryTrendComponent } from './dashboard-server-memory-trend.component';
import { DashboardServerCpuTableComponent } from './dashboard-server-cpu-table.component';
import { DashboardServerMemoryTableComponent } from './dashboard-server-memory-table.component';


@NgModule({
  declarations: [DashboardComponent, DashboardServerCpuMaxComponent, DashboardServerMemoryMaxComponent, DashboardProcessCpuMaxComponent, DashboardProcessMemoryMaxComponent, DashboardServerCpuTopComponent, DashboardServerMemoryTopComponent, DashboardProcessCpuTopComponent, DashboardProcessMemoryTopComponent, DashboardServerCpuTrendComponent, DashboardServerMemoryTrendComponent, DashboardServerCpuTableComponent, DashboardServerMemoryTableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
