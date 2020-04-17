import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sqlquery2RoutingModule } from './sqlquery2-routing.module';
import { Sqlquery2Component } from './sqlquery2.component';
import { Sqlquery2ConditionComponent } from './sqlquery2-condition/sqlquery2-condition.component';
import { Sqlquery2ResultComponent } from './sqlquery2-result/sqlquery2-result.component';
import { Sqlquery2UpdateComponent } from './sqlquery2-update/sqlquery2-update.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [Sqlquery2Component, Sqlquery2ConditionComponent, Sqlquery2ResultComponent, Sqlquery2UpdateComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    Sqlquery2RoutingModule
  ]
})
export class Sqlquery2Module { }
