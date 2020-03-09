import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonviewComponent } from './jsonview.component';


const routes: Routes = [
  { path: 'jsonview',component: JsonviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonviewRoutingModule { }
