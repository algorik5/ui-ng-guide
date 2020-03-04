import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboardv2RoutingModule } from './dashboardv2-routing.module';
import { AboutComponent } from './about/about.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { ViewcpumaxComponent } from './about/viewcpumax.component';
import { ViewmemorymaxComponent } from './about/viewmemorymax.component';
import { ViewdiskmaxComponent } from './about/viewdiskmax.component';
import { ViewswapmaxComponent } from './about/viewswapmax.component';
import { ViewcputrendComponent } from './about/viewcputrend.component';
import { ViewMemoryStatusComponent } from './about/view-memory-status.component';
import { ViewQueueStatusComponent } from './about/view-queue-status.component';
import { ViewQueueDetailComponent } from './about/view-queue-detail.component';


@NgModule({
  declarations: [AboutComponent, ViewcpumaxComponent, ViewmemorymaxComponent, ViewdiskmaxComponent, ViewswapmaxComponent, ViewcputrendComponent, ViewMemoryStatusComponent, ViewQueueStatusComponent, ViewQueueDetailComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    Dashboardv2RoutingModule
  ]
})
export class Dashboardv2Module { }
