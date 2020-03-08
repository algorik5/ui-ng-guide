import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamictableComponent } from './dynamictable.component';


const routes: Routes = [
  { path: 'dynamictable',component: DynamictableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamictableRoutingModule { }
