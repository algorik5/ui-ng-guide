import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcountdownTestComponent } from './acountdown-test/acountdown-test.component';
import { AchartTestComponent } from './achart-test/achart-test.component';
import { AtableTestComponent } from './atable-test/atable-test.component';
import { AstatTestComponent } from './astat-test/astat-test.component';


const routes: Routes = [
  { path: 'acountdown-test',component: AcountdownTestComponent },
  { path: 'achart-test',component: AchartTestComponent },
  { path: 'atable-test',component: AtableTestComponent },
  { path: 'astat-test',component: AstatTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YguideAcompoRoutingModule { }
