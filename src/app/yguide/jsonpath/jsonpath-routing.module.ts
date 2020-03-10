import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpathComponent } from './jsonpath.component';


const routes: Routes = [
  { path: 'jsonpath',component: JsonpathComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonpathRoutingModule { }
