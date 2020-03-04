import { NgModule, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AboutComponent } from './about/about.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
