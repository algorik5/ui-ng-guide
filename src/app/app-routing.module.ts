import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },

  { path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},

  { path: 'guide',loadChildren: () => import('./yguide/layout/layout.module').then(m => m.LayoutModule)},
  { path: 'guide',loadChildren: () => import('./yguide/layout-input/layout-input.module').then(m => m.LayoutInputModule)},
  { path: 'guide',loadChildren: () => import('./yguide/form/form.module').then(m => m.FormModule)},
  { path: 'guide',loadChildren: () => import('./yguide/form-static/form-static.module').then(m => m.FormStaticModule)},
  { path: 'guide',loadChildren: () => import('./yguide/form-readonly/form-readonly.module').then(m => m.FormReadonlyModule)},
  { path: 'guide',loadChildren: () => import('./yguide/table/table.module').then(m => m.TableModule)},
  { path: 'guide',loadChildren: () => import('./yguide/chart/chart.module').then(m => m.ChartModule)},
  { path: 'guide',loadChildren: () => import('./yguide/editor/editor.module').then(m => m.EditorModule)},
  { path: 'guide',loadChildren: () => import('./yguide/treetable/treetable.module').then(m => m.TreetableModule)},
  { path: 'guide',loadChildren: () => import('./yguide/treetable-fromjson/treetable-fromjson.module').then(m => m.TreetableFromjsonModule)},
  { path: 'guide',loadChildren: () => import('./yguide/jsonpath/jsonpath.module').then(m => m.JsonpathModule)},
  { path: 'guide',loadChildren: () => import('./yguide/jsonview/jsonview.module').then(m => m.JsonviewModule)},
  { path: 'guide',loadChildren: () => import('./yguide/stomp/stomp.module').then(m => m.StompModule)},
  { path: 'guide',loadChildren: () => import('./yguide/dblocal/dblocal.module').then(m => m.DblocalModule)},

  { path: 'guide-test',loadChildren: () => import('./yguide-test/dblocalmanager/dblocalmanager.module').then(m => m.DblocalmanagerModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/stompdbinsert/stompdbinsert.module').then(m => m.StompdbinsertModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/stompchart/stompchart.module').then(m => m.StompchartModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/sqlquery2/sqlquery2.module').then(m => m.Sqlquery2Module)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/dynamictable/dynamictable.module').then(m => m.DynamictableModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/dynamicchart/dynamicchart.module').then(m => m.DynamicchartModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/sqlquery/sqlquery.module').then(m => m.SqlqueryModule)},
  { path: 'guide-test',loadChildren: () => import('./yguide-test/sqlchart/sqlchart.module').then(m => m.SqlchartModule)},
  
  { path: 'dashboard',loadChildren: () => import('./ydashboard/ydashboard.module').then(m => m.YdashboardModule)},
  { path: 'test',loadChildren: () => import('./ytest/ytest.module').then(m => m.YtestModule)},

  { path: 'tool',loadChildren: () => import('./ytool/ytool.module').then(m => m.YtoolModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
