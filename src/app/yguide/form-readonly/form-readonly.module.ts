import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormReadonlyRoutingModule } from './form-readonly-routing.module';
import { FormReadonlyComponent } from './form-readonly.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';


@NgModule({
  declarations: [FormReadonlyComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,NzCodeEditorModule,
    FormReadonlyRoutingModule
  ]
})
export class FormReadonlyModule { }
