import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzGridModule, NzIconModule, NzLayoutModule, NzMenuModule, NgZorroAntdModule } from 'ng-zorro-antd';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcompoModule } from './acompo/acompo.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeTableModule } from 'primeng/treetable';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxEchartsModule } from 'ngx-echarts';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule
    ,FormsModule,ReactiveFormsModule
    ,ScrollingModule,ClipboardModule
    ,NgPipesModule,NgxJsonViewerModule,TreeTableModule
    ,NgZorroAntdModule,NzCodeEditorModule
    ,NgxEchartsModule
    ,AcompoModule
  ]
})
export class SharedModule { }

