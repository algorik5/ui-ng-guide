import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormReadonlyComponent } from './form-readonly.component';


const routes: Routes = [
  { path: 'form-readonly',component: FormReadonlyComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormReadonlyRoutingModule { }
