import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'page-header', loadChildren: () => import('./page-header/page-header.module').then(m => m.PageHeaderModule) },

  {path: 'test1',loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module)},
  {path: 'dashboard',loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'dashboardv2',loadChildren: () => import('./dashboardv2/dashboardv2.module').then(m => m.Dashboardv2Module)},

  {path: 'template',loadChildren: () => import('./ytemplate/ytemplate.module').then(m => m.YtemplateModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
