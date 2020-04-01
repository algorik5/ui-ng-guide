import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompoRoutingModule } from './acompo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { AcountdownComponent } from './acountdown/acountdown.component';
import { AchartComponent } from './achart/achart.component';
import { AtableComponent } from './atable/atable.component';
import { AstatComponent } from './astat/astat.component';

@NgModule({
  declarations: [AcountdownComponent, AchartComponent, AtableComponent, AstatComponent],
  exports: [AcountdownComponent, AchartComponent, AtableComponent, AstatComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,
    AcompoRoutingModule
  ]
})
export class AcompoModule { }
