import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },

  {path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},

  {path: 'sqlview',loadChildren: () => import('./sqlview/sqlview.module').then(m => m.SqlviewModule)},

  {path: 'dashboard',loadChildren: () => import('./ydashboard/ydashboard.module').then(m => m.YdashboardModule)},
  {path: 'template',loadChildren: () => import('./ytemplate/ytemplate.module').then(m => m.YtemplateModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
