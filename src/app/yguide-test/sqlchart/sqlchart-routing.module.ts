import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlchartComponent } from './sqlchart.component';


const routes: Routes = [
  { path: 'sqlchart',component: SqlchartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlchartRoutingModule { }
