import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompdbinsertComponent } from './stompdbinsert.component';


const routes: Routes = [
  { path: 'stompdbinsert',component: StompdbinsertComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StompdbinsertRoutingModule { }
