import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreetableRoutingModule } from './treetable-routing.module';
import { TreetableComponent } from './treetable.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [TreetableComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    TreetableRoutingModule
  ]
})
export class TreetableModule { }
