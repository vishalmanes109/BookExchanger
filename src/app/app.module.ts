import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UpdateprofileComponent } from './users/updateprofile/updateprofile.component';
import { CreatepostComponent } from './post/createpost/createpost.component';
import { UpdatepostComponent } from './post/updatepost/updatepost.component';
import { MyfeedComponent } from './postlist/myfeed/myfeed.component';
import { CreateprofileComponent } from './users/createprofile/createprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    UpdateprofileComponent,
    CreatepostComponent,
    UpdatepostComponent,
    MyfeedComponent,
    CreateprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
