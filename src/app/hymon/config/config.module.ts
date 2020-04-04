import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { ViewAtopComponent } from './view-atop.component';
import { ViewArightComponent } from './view-aright.component';
import { ViewCenterComponent } from './view-center.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { NgPipesModule } from 'ngx-pipes';
import { AcompoModule } from 'src/app/acompo/acompo.module';
import { ViewTableschemaComponent } from './view-tableschema.component';


@NgModule({
  declarations: [ConfigComponent, ViewAtopComponent, ViewArightComponent, ViewCenterComponent, ViewTableschemaComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,NgPipesModule,AcompoModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
