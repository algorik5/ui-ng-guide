import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbtableComponent } from './dbtable.component';


const routes: Routes = [
  { path: 'dbtable',component: DbtableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbtableRoutingModule { }
