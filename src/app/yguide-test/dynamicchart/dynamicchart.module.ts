import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicchartRoutingModule } from './dynamicchart-routing.module';
import { DynamicchartComponent } from './dynamicchart.component';
import { DynamicchartConditionComponent } from './dynamicchart-condition/dynamicchart-condition.component';
import { DynamicchartChartComponent } from './dynamicchart-chart/dynamicchart-chart.component';
import { DynamicchartTableComponent } from './dynamicchart-table/dynamicchart-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [DynamicchartComponent, DynamicchartConditionComponent, DynamicchartChartComponent, DynamicchartTableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,
    DynamicchartRoutingModule
  ]
})
export class DynamicchartModule { }
