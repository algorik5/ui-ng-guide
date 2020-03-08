import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlqueryRoutingModule } from './sqlquery-routing.module';
import { SqlqueryComponent } from './sqlquery.component';
import { SqlqueryConditionComponent } from './sqlquery-condition/sqlquery-condition.component';
import { SqlqueryListComponent } from './sqlquery-list/sqlquery-list.component';
import { SqlqueryUpdateComponent } from './sqlquery-update/sqlquery-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [SqlqueryComponent, SqlqueryConditionComponent, SqlqueryListComponent, SqlqueryUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    SqlqueryRoutingModule
  ]
})
export class SqlqueryModule { }
