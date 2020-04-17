import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblocalmanagerRoutingModule } from './dblocalmanager-routing.module';
import { DblocalmanagerComponent } from './dblocalmanager.component';
import { DblocalmanagerFormComponent } from './dblocalmanager-form/dblocalmanager-form.component';
import { DblocalmanagerTableschemaComponent } from './dblocalmanager-tableschema/dblocalmanager-tableschema.component';
import { DblocalmanagerTabledataComponent } from './dblocalmanager-tabledata/dblocalmanager-tabledata.component';

import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [DblocalmanagerComponent, DblocalmanagerFormComponent, DblocalmanagerTableschemaComponent, DblocalmanagerTabledataComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    DblocalmanagerRoutingModule
  ]
})
export class DblocalmanagerModule { }
