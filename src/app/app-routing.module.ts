import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },

  { path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},

  // { path: 'sqlview',loadChildren: () => import('./sqlview/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
  // { path: 'sqlview',loadChildren: () => import('./sqlview/sqlchart/sqlchart.module').then(m => m.SqlchartModule)},

  { path: 'template',loadChildren: () => import('./ytemplate/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
  { path: 'template',loadChildren: () => import('./ytemplate/sqlchart/sqlchart.module').then(m => m.SqlchartModule)},
  { path: 'template',loadChildren: () => import('./ytemplate/dynamictable/dynamictable.module').then(m => m.DynamictableModule)},

  { path: 'dashboard',loadChildren: () => import('./ydashboard/ydashboard.module').then(m => m.YdashboardModule)},
  { path: 'test',loadChildren: () => import('./ytest/ytest.module').then(m => m.YtestModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
