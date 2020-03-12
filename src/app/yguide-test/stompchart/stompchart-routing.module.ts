import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompchartComponent } from './stompchart.component';


const routes: Routes = [
  { path: 'stompchart',component: StompchartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StompchartRoutingModule { }
