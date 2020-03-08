import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
