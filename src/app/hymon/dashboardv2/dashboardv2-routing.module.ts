import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboardv2Component } from './dashboardv2.component';


const routes: Routes = [
  { path: 'dashboardv2',component: Dashboardv2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboardv2RoutingModule { }
