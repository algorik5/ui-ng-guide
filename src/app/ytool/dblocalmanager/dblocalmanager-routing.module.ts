import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DblocalmanagerComponent } from './dblocalmanager.component';


const routes: Routes = [
  { path: 'dblocalmanager',component: DblocalmanagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DblocalmanagerRoutingModule { }
