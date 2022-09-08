import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ComponentsComponent } from './components/components.component';
import { LeadsComponent } from './components/leads/leads.component';
import { AllNotificationsComponent } from './components/notifications/all-notifications/all-notifications.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SingleNotificationComponent } from './components/notifications/single-notification/single-notification.component';
import { AllPmsComponent } from './components/pms/all-pms/all-pms.component';
import { PmsComponent } from './components/pms/pms.component';
import { SinglePmsComponent } from './components/pms/single-pms/single-pms.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:'',component:ComponentsComponent,canActivate:[AuthGuardService],children:[
    {path:'',component:UsersComponent},
    {path:'leads',component:LeadsComponent},
    {path:'notifications',component:NotificationsComponent,children:[
      {path:'',component:AllNotificationsComponent},
      {path:'add',component:SingleNotificationComponent},
      {path:'add/:userId',component:SingleNotificationComponent},
      {path:'edit/:id',component:SingleNotificationComponent},
    ]},
    {path:'pms',component:PmsComponent,children:[
      {path:'',component:AllPmsComponent},
      {path:'add',component:SinglePmsComponent},
      {path:'edit/:id',component:SinglePmsComponent},
    ]}
  ]},
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: SigninComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
