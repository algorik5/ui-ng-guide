import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompMsgtodbRoutingModule } from './stomp-msgtodb-routing.module';
import { StompMsgtodbComponent } from './stomp-msgtodb.component';
import { StompMsgtodbFormComponent } from './stomp-msgtodb-form/stomp-msgtodb-form.component';
import { StompMsgtodbStatsComponent } from './stomp-msgtodb-stats/stomp-msgtodb-stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [StompMsgtodbComponent, StompMsgtodbFormComponent, StompMsgtodbStatsComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    StompMsgtodbRoutingModule
  ]
})
export class StompMsgtodbModule { }
