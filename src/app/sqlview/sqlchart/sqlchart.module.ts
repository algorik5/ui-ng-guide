import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlchartRoutingModule } from './sqlchart-routing.module';
import { SqlchartComponent } from './sqlchart.component';
import { SqlchartConditionComponent } from './sqlchart-condition/sqlchart-condition.component';
import { SqlchartListComponent } from './sqlchart-list/sqlchart-list.component';
import { SqlchartChartComponent } from './sqlchart-chart/sqlchart-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [SqlchartComponent, SqlchartConditionComponent, SqlchartListComponent, SqlchartChartComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    SqlchartRoutingModule
  ]
})
export class SqlchartModule { }
