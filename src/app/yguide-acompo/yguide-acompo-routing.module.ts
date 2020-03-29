import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcountdownTestComponent } from './acountdown-test/acountdown-test.component';


const routes: Routes = [
  { path: 'acountdown-test',component: AcountdownTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YguideAcompoRoutingModule { }
