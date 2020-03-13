import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DblocalComponent } from './dblocal.component';


const routes: Routes = [
  { path: 'dblocal',component: DblocalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DblocalRoutingModule { }
