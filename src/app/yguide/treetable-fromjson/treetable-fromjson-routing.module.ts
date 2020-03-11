import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreetableFromjsonComponent } from './treetable-fromjson.component';


const routes: Routes = [
  { path: 'treetable-fromjson',component: TreetableFromjsonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreetableFromjsonRoutingModule { }
