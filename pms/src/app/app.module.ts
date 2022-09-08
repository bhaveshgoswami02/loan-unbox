import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './share/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { UsersComponent } from './components/users/users.component';
import { LeadsComponent } from './components/leads/leads.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SigninComponent,
    ComponentsComponent,
    UsersComponent,
    LeadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
