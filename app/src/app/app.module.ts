import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthComponent } from './auth/auth.component';
import { ComponentsComponent } from './components/components.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LeadComponent } from './components/lead/lead.component';
import { AllLeadsComponent } from './components/all-leads/all-leads.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ComponentsComponent,
    SigninComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ProfileComponent,
    EditProfileComponent,
    LeadComponent,
    AllLeadsComponent,
    NotificationsComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
