import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompMsgtodbComponent } from './stomp-msgtodb.component';


const routes: Routes = [
  { path: 'stomp-msgtodb',component: StompMsgtodbComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StompMsgtodbRoutingModule { }
