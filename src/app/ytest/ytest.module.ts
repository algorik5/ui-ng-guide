import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserfilterComponent } from './userfilter/userfilter.component';
import { UserformComponent } from './userform/userform.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserallComponent } from './userall/userall.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AformComponent } from './aform/aform.component';
import { ViewFormZorroComponent } from './aform/view-form-zorro.component';
import { ViewFormHapifyComponent } from './aform/view-form-hapify.component';
import { YtestRoutingModule } from './ytest-routing.module';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeTableModule } from 'primeng/treetable';
import { TestMqttComponent } from './test-mqtt/test-mqtt.component';
import { TestWebsocketComponent } from './test-websocket/test-websocket.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, UserfilterComponent, UserformComponent, UsertableComponent, UserdetailComponent, UserallComponent, AformComponent, ViewFormZorroComponent, ViewFormHapifyComponent, TestMqttComponent, TestWebsocketComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,NgxJsonViewerModule,ScrollingModule,TreeTableModule,
    YtestRoutingModule
  ]
})
export class YtestModule { }
