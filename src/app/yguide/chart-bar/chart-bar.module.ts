import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartBarRoutingModule } from './chart-bar-routing.module';
import { ChartBarComponent } from './chart-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [ChartBarComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    ChartBarRoutingModule
  ]
})
export class ChartBarModule { }
