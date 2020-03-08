import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,
    TableRoutingModule
  ]
})
export class TableModule { }
