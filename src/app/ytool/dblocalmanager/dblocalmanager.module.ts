import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblocalmanagerRoutingModule } from './dblocalmanager-routing.module';
import { DblocalmanagerComponent } from './dblocalmanager.component';
import { DblocalmanagerFormComponent } from './dblocalmanager-form/dblocalmanager-form.component';
import { DblocalmanagerTableschemaComponent } from './dblocalmanager-tableschema/dblocalmanager-tableschema.component';
import { DblocalmanagerTabledataComponent } from './dblocalmanager-tabledata/dblocalmanager-tabledata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [DblocalmanagerComponent, DblocalmanagerFormComponent, DblocalmanagerTableschemaComponent, DblocalmanagerTabledataComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    DblocalmanagerRoutingModule
  ]
})
export class DblocalmanagerModule { }
