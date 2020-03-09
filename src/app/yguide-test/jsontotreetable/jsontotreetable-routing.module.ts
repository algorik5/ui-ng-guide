import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsontotreetableComponent } from './jsontotreetable.component';


const routes: Routes = [
  { path: 'jsontotreetable',component: JsontotreetableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsontotreetableRoutingModule { }
