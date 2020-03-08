import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlqueryComponent } from './sqlquery.component';


const routes: Routes = [
  { path: 'sqlquery',component: SqlqueryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlqueryRoutingModule { }
