import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbtableRoutingModule } from './dbtable-routing.module';
import { DbtableComponent } from './dbtable.component';
import { DbtableFormComponent } from './dbtable-form/dbtable-form.component';
import { DbtableStatsComponent } from './dbtable-stats/dbtable-stats.component';
import { DbtableTableComponent } from './dbtable-table/dbtable-table.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [DbtableComponent, DbtableFormComponent, DbtableStatsComponent, DbtableTableComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DbtableRoutingModule
  ]
})
export class DbtableModule { }
