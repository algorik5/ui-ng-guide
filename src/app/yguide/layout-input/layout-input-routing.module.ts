import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutInputComponent } from './layout-input.component';


const routes: Routes = [
  { path: 'layout-input',component: LayoutInputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutInputRoutingModule { }
