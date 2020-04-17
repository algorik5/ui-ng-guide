import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { UserfilterComponent } from './userfilter/userfilter.component';
import { UserformComponent } from './userform/userform.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserallComponent } from './userall/userall.component';
import { AformComponent } from './aform/aform.component';
import { ViewFormZorroComponent } from './aform/view-form-zorro.component';
import { ViewFormHapifyComponent } from './aform/view-form-hapify.component';
import { YtestRoutingModule } from './ytest-routing.module';
import { TestMqttComponent } from './test-mqtt/test-mqtt.component';
import { TestWebsocketComponent } from './test-websocket/test-websocket.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, UserfilterComponent, UserformComponent, UsertableComponent, UserdetailComponent, UserallComponent, AformComponent, ViewFormZorroComponent, ViewFormHapifyComponent, TestMqttComponent, TestWebsocketComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    YtestRoutingModule
  ]
})
export class YtestModule { }
