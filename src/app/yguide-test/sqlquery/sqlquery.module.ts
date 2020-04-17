import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlqueryRoutingModule } from './sqlquery-routing.module';
import { SqlqueryComponent } from './sqlquery.component';
import { SqlqueryConditionComponent } from './sqlquery-condition/sqlquery-condition.component';
import { SqlqueryListComponent } from './sqlquery-list/sqlquery-list.component';
import { SqlqueryUpdateComponent } from './sqlquery-update/sqlquery-update.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [SqlqueryComponent, SqlqueryConditionComponent, SqlqueryListComponent, SqlqueryUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    SqlqueryRoutingModule
  ]
})
export class SqlqueryModule { }
