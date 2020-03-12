import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompchartRoutingModule } from './stompchart-routing.module';
import { StompchartComponent } from './stompchart.component';
import { StompchartFormComponent } from './stompchart-form/stompchart-form.component';
import { StompchartChartComponent } from './stompchart-chart/stompchart-chart.component';
import { StompchartTableComponent } from './stompchart-table/stompchart-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [StompchartComponent, StompchartFormComponent, StompchartChartComponent, StompchartTableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    StompchartRoutingModule
  ]
})
export class StompchartModule { }
