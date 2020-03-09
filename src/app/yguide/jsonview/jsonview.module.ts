import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonviewRoutingModule } from './jsonview-routing.module';
import { JsonviewComponent } from './jsonview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [JsonviewComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,
    JsonviewRoutingModule
  ]
})
export class JsonviewModule { }
