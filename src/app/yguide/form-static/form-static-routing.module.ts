import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormStaticComponent } from './form-static.component';


const routes: Routes = [
  { path: 'form-static',component: FormStaticComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormStaticRoutingModule { }
