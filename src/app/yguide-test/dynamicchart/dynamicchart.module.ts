import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicchartRoutingModule } from './dynamicchart-routing.module';
import { DynamicchartComponent } from './dynamicchart.component';
import { DynamicchartConditionComponent } from './dynamicchart-condition/dynamicchart-condition.component';
import { DynamicchartChartComponent } from './dynamicchart-chart/dynamicchart-chart.component';
import { DynamicchartTableComponent } from './dynamicchart-table/dynamicchart-table.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [DynamicchartComponent, DynamicchartConditionComponent, DynamicchartChartComponent, DynamicchartTableComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DynamicchartRoutingModule
  ]
})
export class DynamicchartModule { }
