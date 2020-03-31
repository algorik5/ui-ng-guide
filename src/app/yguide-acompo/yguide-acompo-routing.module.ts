import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcountdownTestComponent } from './acountdown-test/acountdown-test.component';
import { AchartTestComponent } from './achart-test/achart-test.component';


const routes: Routes = [
  { path: 'acountdown-test',component: AcountdownTestComponent },
  { path: 'achart-test',component: AchartTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YguideAcompoRoutingModule { }
