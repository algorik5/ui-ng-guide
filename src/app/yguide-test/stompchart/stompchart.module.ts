import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompchartRoutingModule } from './stompchart-routing.module';
import { StompchartComponent } from './stompchart.component';
import { StompchartFormComponent } from './stompchart-form/stompchart-form.component';
import { StompchartChartComponent } from './stompchart-chart/stompchart-chart.component';
import { StompchartTableComponent } from './stompchart-table/stompchart-table.component';
import { StompchartJsonviewComponent } from './stompchart-jsonview/stompchart-jsonview.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [StompchartComponent, StompchartFormComponent, StompchartChartComponent, StompchartTableComponent, StompchartJsonviewComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    StompchartRoutingModule
  ]
})
export class StompchartModule { }
