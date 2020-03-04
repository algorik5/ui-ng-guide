import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { PageHeaderActionsComponent } from './page-header/page-header-actions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboardv2Component } from './dashboardv2/dashboardv2.component';


const routes: Routes = [
  // { path: '',component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',component: DashboardComponent },
  { path: 'dashboardv2',component: Dashboardv2Component },
  { path: 'table',component: TableComponent },
  { path: 'form',component: FormComponent },
  { path: 'page-header',component: PageHeaderActionsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YdashboardRoutingModule { }
