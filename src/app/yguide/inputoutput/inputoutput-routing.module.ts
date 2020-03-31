import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputoutputComponent } from './inputoutput.component';


const routes: Routes = [
  { path: 'inputoutput',component: InputoutputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputoutputRoutingModule { }
