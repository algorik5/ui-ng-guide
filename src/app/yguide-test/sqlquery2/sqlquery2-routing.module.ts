import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Sqlquery2Component } from './sqlquery2.component';


const routes: Routes = [
  { path: 'sqlquery2',component: Sqlquery2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sqlquery2RoutingModule { }
