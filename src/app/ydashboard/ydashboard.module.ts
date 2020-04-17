import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YdashboardRoutingModule } from './ydashboard-routing.module';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { PageHeaderActionsComponent } from './page-header/page-header-actions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboardv2Component } from './dashboardv2/dashboardv2.component';
import { ViewQueueDetailComponent } from './dashboardv2/view-queue-detail.component';
import { ViewMemoryStatusComponent } from './dashboardv2/view-memory-status.component';
import { ViewQueueStatusComponent } from './dashboardv2/view-queue-status.component';
import { ViewcpumaxComponent } from './dashboardv2/viewcpumax.component';
import { ViewcputrendComponent } from './dashboardv2/viewcputrend.component';
import { ViewdiskmaxComponent } from './dashboardv2/viewdiskmax.component';
import { ViewmemorymaxComponent } from './dashboardv2/viewmemorymax.component';
import { ViewswapmaxComponent } from './dashboardv2/viewswapmax.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';

@NgModule({
  declarations: [ DashboardComponent,Dashboardv2Component,TableComponent,FormComponent,PageHeaderActionsComponent,
    ViewMemoryStatusComponent,ViewQueueStatusComponent,ViewQueueDetailComponent,ViewcpumaxComponent,ViewcputrendComponent,
    ViewdiskmaxComponent,ViewmemorymaxComponent,ViewswapmaxComponent ],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    YdashboardRoutingModule
  ]
})
export class YdashboardModule { }
