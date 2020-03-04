import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlqueryComponent } from './sqlquery/sqlquery.component';


const routes: Routes = [
  { path: '', redirectTo: 'sqlquery', pathMatch: 'full' },
  { path: 'sqlquery',component: SqlqueryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlviewRoutingModule { }
