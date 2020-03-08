import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },

  { path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},

  { path: 'guide',loadChildren: () => import('./yguide/layout/layout.module').then(m => m.LayoutModule)},
  { path: 'guide',loadChildren: () => import('./yguide/form/form.module').then(m => m.FormModule)},
  { path: 'guide',loadChildren: () => import('./yguide/form-readonly/form-readonly.module').then(m => m.FormReadonlyModule)},
  { path: 'guide',loadChildren: () => import('./yguide/table/table.module').then(m => m.TableModule)},
  { path: 'guide',loadChildren: () => import('./yguide/chart/chart.module').then(m => m.ChartModule)},
  { path: 'guide',loadChildren: () => import('./yguide/editor/editor.module').then(m => m.EditorModule)},

  
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
