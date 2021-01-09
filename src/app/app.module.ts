import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./users/register/register.component";
import { LoginComponent } from "./users/login/login.component";
import { NavbarComponent } from "./core/navbar/navbar.component";
import { AboutComponent } from "./core/about/about.component";
import { ContactComponent } from "./core/contact/contact.component";
import { ProfileComponent } from "./users/profile/profile.component";
import { UpdateprofileComponent } from "./users/updateprofile/updateprofile.component";
import { CreatepostComponent } from "./post/createpost/createpost.component";
import { UpdatepostComponent } from "./post/updatepost/updatepost.component";
import { MyfeedComponent } from "./postlist/myfeed/myfeed.component";
import { CreateprofileComponent } from "./users/createprofile/createprofile.component";
import { PagenotfoundComponent } from "./core/pagenotfound/pagenotfound.component";
import { FooterComponent } from "./core/footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { FormsModule } from "@angular/forms";

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
    CreateprofileComponent,
    PagenotfoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
