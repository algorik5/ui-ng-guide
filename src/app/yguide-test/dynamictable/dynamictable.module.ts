import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamictableRoutingModule } from './dynamictable-routing.module';
import { DynamictableComponent } from './dynamictable.component';
import { DynamictableConditionComponent } from './dynamictable-condition/dynamictable-condition.component';
import { DynamictableResultComponent } from './dynamictable-result/dynamictable-result.component';
import { DynamictableDetailComponent } from './dynamictable-detail/dynamictable-detail.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [DynamictableComponent, DynamictableConditionComponent, DynamictableResultComponent, DynamictableDetailComponent ],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DynamictableRoutingModule
  ]
})
export class DynamictableModule { }
