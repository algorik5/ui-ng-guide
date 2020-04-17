import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
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
import { DashboardAtopComponent } from './dashboard-atop/dashboard-atop.component';
import { DashboardAleftComponent } from './dashboard-aleft/dashboard-aleft.component';
import { DashboardArightComponent } from './dashboard-aright/dashboard-aright.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';

@NgModule({
  declarations: [DashboardComponent, DashboardServerCpuMaxComponent, DashboardServerMemoryMaxComponent, DashboardProcessCpuMaxComponent, DashboardProcessMemoryMaxComponent, DashboardServerCpuTopComponent, DashboardServerMemoryTopComponent, DashboardProcessCpuTopComponent, DashboardProcessMemoryTopComponent, DashboardServerCpuTrendComponent, DashboardServerMemoryTrendComponent, DashboardServerCpuTableComponent, DashboardServerMemoryTableComponent, DashboardAtopComponent, DashboardAleftComponent, DashboardArightComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
