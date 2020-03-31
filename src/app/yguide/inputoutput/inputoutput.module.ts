import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputoutputRoutingModule } from './inputoutput-routing.module';
import { InputoutputComponent } from './inputoutput.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { InputoutputChildComponent } from './inputoutput-child/inputoutput-child.component';


@NgModule({
  declarations: [InputoutputComponent, InputoutputChildComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
    InputoutputRoutingModule
  ]
})
export class InputoutputModule { }
