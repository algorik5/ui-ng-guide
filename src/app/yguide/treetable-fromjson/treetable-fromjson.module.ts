import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreetableFromjsonRoutingModule } from './treetable-fromjson-routing.module';
import { TreetableFromjsonComponent } from './treetable-fromjson.component';
import { MyConditionComponent } from './my-condition/my-condition.component';
import { MyEditorComponent } from './my-editor/my-editor.component';
import { MyTreetableComponent } from './my-treetable/my-treetable.component';
import { SharedModule } from 'src/app/shared.module';
import { AcompoModule } from 'src/app/acompo/acompo.module';


@NgModule({
  declarations: [TreetableFromjsonComponent, MyConditionComponent, MyEditorComponent, MyTreetableComponent],
  imports: [
    CommonModule,
    SharedModule,AcompoModule,
    TreetableFromjsonRoutingModule
  ]
})
export class TreetableFromjsonModule { }
