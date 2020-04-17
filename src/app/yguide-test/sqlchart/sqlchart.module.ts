import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlchartRoutingModule } from './sqlchart-routing.module';
import { SqlchartComponent } from './sqlchart.component';
import { SqlchartConditionComponent } from './sqlchart-condition/sqlchart-condition.component';
import { SqlchartListComponent } from './sqlchart-list/sqlchart-list.component';
import { SqlchartChartComponent } from './sqlchart-chart/sqlchart-chart.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [SqlchartComponent, SqlchartConditionComponent, SqlchartListComponent, SqlchartChartComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    SqlchartRoutingModule
  ]
})
export class SqlchartModule { }
