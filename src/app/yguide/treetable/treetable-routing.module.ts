import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreetableComponent } from './treetable.component';


const routes: Routes = [
  { path: 'treetable',component: TreetableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreetableRoutingModule { }
