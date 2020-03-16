import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbtableRoutingModule } from './dbtable-routing.module';
import { DbtableComponent } from './dbtable.component';
import { DbtableFormComponent } from './dbtable-form/dbtable-form.component';
import { DbtableStatsComponent } from './dbtable-stats/dbtable-stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { DbtableTableComponent } from './dbtable-table/dbtable-table.component';


@NgModule({
  declarations: [DbtableComponent, DbtableFormComponent, DbtableStatsComponent, DbtableTableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    DbtableRoutingModule
  ]
})
export class DbtableModule { }
