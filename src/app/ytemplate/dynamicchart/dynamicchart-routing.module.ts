import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicchartComponent } from './dynamicchart.component';


const routes: Routes = [
  { path: 'dynamicchart',component: DynamicchartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicchartRoutingModule { }
