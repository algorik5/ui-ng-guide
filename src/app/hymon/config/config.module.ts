import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { ViewAtopComponent } from './view-atop.component';
import { ViewArightComponent } from './view-aright.component';
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
import { ViewLocalstorageComponent } from './view-localstorage.component';
import { ViewMsgstatusComponent } from './view-msgstatus.component';
import { ViewTablestatusComponent } from './view-tablestatus.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [ConfigComponent, ViewAtopComponent, ViewArightComponent, ViewTableschemaComponent, ViewLocalstorageComponent, ViewMsgstatusComponent, ViewTablestatusComponent],
  imports: [
    CommonModule,
    SharedModule, 
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
