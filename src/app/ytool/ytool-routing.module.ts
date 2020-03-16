import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalstorageComponent } from './localstorage/localstorage.component';


const routes: Routes = [
  { path: 'localstorage',component: LocalstorageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YtoolRoutingModule { }
