import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YtemplateRoutingModule } from './ytemplate-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserfilterComponent } from './userfilter/userfilter.component';
import { UserformComponent } from './userform/userform.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserallComponent } from './userall/userall.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, UserfilterComponent, UserformComponent, UsertableComponent, UserdetailComponent, UserallComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,ReactiveFormsModule,
    YtemplateRoutingModule
  ]
})
export class YtemplateModule { }
