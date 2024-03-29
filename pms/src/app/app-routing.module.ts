import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ComponentsComponent } from './components/components.component';
import { LeadsComponent } from './components/leads/leads.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SingleNotificationComponent } from './components/notifications/single-notification/single-notification.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: UsersComponent },
      { path: 'leads/:user_code', component: LeadsComponent },
      {
        path: 'notifications',
        component: NotificationsComponent,
        children: [
          { path: 'add', component: SingleNotificationComponent },
          { path: 'add/:userId', component: SingleNotificationComponent },
          { path: 'edit/:id', component: SingleNotificationComponent },
        ],
      },
      { path: 'users', component: UsersComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [{ path: '', component: SigninComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
