import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AboutComponent } from './components/about/about.component';
import { AllLeadsComponent } from './components/all-leads/all-leads.component';
import { ComponentsComponent } from './components/components.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LeadComponent } from './components/lead/lead.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'',component:ComponentsComponent,children:[
    {path:'',component:HomeComponent},
    {path:'lead',component:LeadComponent},
    {path:'leads',component:AllLeadsComponent},
    {path:'contact',component:ContactComponent},
    {path:'about',component:AboutComponent},
    {path:'notifications',component:NotificationsComponent},
    {path:'edit-profile',component:EditProfileComponent},
    {path:'profile',component:ProfileComponent},
  ]},
  {path:'auth',component:AuthComponent,children:[
    {path:'',component:SigninComponent},
    {path:'register',component:RegisterComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
