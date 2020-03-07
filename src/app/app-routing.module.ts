import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },

  { path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},

  { path: 'last',loadChildren: () => import('./ylast/layout/layout.module').then(m => m.LayoutModule)},
  { path: 'last',loadChildren: () => import('./ylast/form/form.module').then(m => m.FormModule)},
  { path: 'last',loadChildren: () => import('./ylast/form-readonly/form-readonly.module').then(m => m.FormReadonlyModule)},
  { path: 'last',loadChildren: () => import('./ylast/table/table.module').then(m => m.TableModule)},
  { path: 'last',loadChildren: () => import('./ylast/chart/chart.module').then(m => m.ChartModule)},
  { path: 'last',loadChildren: () => import('./ylast/editor/editor.module').then(m => m.EditorModule)},

  
  { path: 'template',loadChildren: () => import('./ytemplate/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
  { path: 'template',loadChildren: () => import('./ytemplate/sqlchart/sqlchart.module').then(m => m.SqlchartModule)},
  { path: 'template',loadChildren: () => import('./ytemplate/dynamictable/dynamictable.module').then(m => m.DynamictableModule)},
  { path: 'template',loadChildren: () => import('./ytemplate/dynamicchart/dynamicchart.module').then(m => m.DynamicchartModule)},

  { path: 'dashboard',loadChildren: () => import('./ydashboard/ydashboard.module').then(m => m.YdashboardModule)},
  { path: 'test',loadChildren: () => import('./ytest/ytest.module').then(m => m.YtestModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
