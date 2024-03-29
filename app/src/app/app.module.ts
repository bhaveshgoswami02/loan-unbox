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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './auth/password/password.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';
import { EmptyViewComponent } from './share/empty-view/empty-view.component';
import { LeadDetailsComponent } from './components/lead-details/lead-details.component';
import { LoaderComponent } from './share/loader/loader.component';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { IntroComponent } from './intro/intro.component';
import { SwiperModule } from 'swiper/angular';

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
    FooterComponent,
    PasswordComponent,
    VerifyOtpComponent,
    EmptyViewComponent,
    LeadDetailsComponent,
    LoaderComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireMessagingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    RippleModule,
    SwiperModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
