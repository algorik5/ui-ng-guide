import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserfilterComponent } from './userfilter/userfilter.component';
import { UserformComponent } from './userform/userform.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserallComponent } from './userall/userall.component';

 
const routes: Routes = [
  // { path: '',component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent },
  { path: 'userfilter',component: UserfilterComponent },
  { path: 'userform',component: UserformComponent },
  { path: 'usertable',component: UsertableComponent },
  { path: 'userdetail',component: UserdetailComponent },
  { path: 'userall',component: UserallComponent },
  { path: 'profile',component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YtemplateRoutingModule { }
