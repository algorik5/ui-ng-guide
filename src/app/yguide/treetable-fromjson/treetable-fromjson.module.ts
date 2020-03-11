import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreetableFromjsonRoutingModule } from './treetable-fromjson-routing.module';
import { TreetableFromjsonComponent } from './treetable-fromjson.component';
import { MyConditionComponent } from './my-condition/my-condition.component';
import { MyEditorComponent } from './my-editor/my-editor.component';
import { MyTreetableComponent } from './my-treetable/my-treetable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [TreetableFromjsonComponent, MyConditionComponent, MyEditorComponent, MyTreetableComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    TreetableFromjsonRoutingModule
  ]
})
export class TreetableFromjsonModule { }
