import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlviewRoutingModule } from './sqlview-routing.module';
import { SqlqueryComponent } from './sqlquery/sqlquery.component';


@NgModule({
  declarations: [SqlqueryComponent],
  imports: [
    CommonModule,
    SqlviewRoutingModule
  ]
})
export class SqlviewModule { }
