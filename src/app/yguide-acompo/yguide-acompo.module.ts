import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YguideAcompoRoutingModule } from './yguide-acompo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { AcompoModule } from '../acompo/acompo.module';
import { AcountdownTestComponent } from './acountdown-test/acountdown-test.component';
import { AchartTestComponent } from './achart-test/achart-test.component';


@NgModule({
  declarations: [AcountdownTestComponent, AchartTestComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
    AcompoModule,
    YguideAcompoRoutingModule
  ]
})
export class YguideAcompoModule { }
