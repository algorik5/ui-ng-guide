import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsontotreetableRoutingModule } from './jsontotreetable-routing.module';
import { JsontotreetableComponent } from './jsontotreetable.component';
import { JsontotreetableConditionComponent } from './jsontotreetable-condition/jsontotreetable-condition.component';
import { JsontotreetableEditorComponent } from './jsontotreetable-editor/jsontotreetable-editor.component';
import { JsontotreetableTreetableComponent } from './jsontotreetable-treetable/jsontotreetable-treetable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [JsontotreetableComponent, JsontotreetableConditionComponent, JsontotreetableEditorComponent, JsontotreetableTreetableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    JsontotreetableRoutingModule
  ]
})
export class JsontotreetableModule { }
