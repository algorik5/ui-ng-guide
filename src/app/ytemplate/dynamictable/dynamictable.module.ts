import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamictableRoutingModule } from './dynamictable-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { DynamictableComponent } from './dynamictable.component';
import { DynamictableConditionComponent } from './dynamictable-condition/dynamictable-condition.component';
import { DynamictableResultComponent } from './dynamictable-result/dynamictable-result.component';
import { DynamictableDetailComponent } from './dynamictable-detail/dynamictable-detail.component';


@NgModule({
  declarations: [DynamictableComponent, DynamictableConditionComponent, DynamictableResultComponent, DynamictableDetailComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,NgZorroAntdModule,NgxEchartsModule,
    DynamictableRoutingModule
  ]
})
export class DynamictableModule { }
