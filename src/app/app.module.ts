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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { FormsModule } from "@angular/forms";
import { SuiModule } from "ng2-semantic-ui";
import { TokenInterceptorService } from "../app/service/token-interceptor.service";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { LocationService } from "./service/location.service";
import { ValidationService } from "./service/validation.service";
import { ProfileService } from "./service/profile.service";
import { PostService } from "./service/post.service";
import { SinglepostComponent } from './postlist/singlepost/singlepost.component';
import { SharedService } from "./service/shared.service";
import { DeletepostComponent } from './post/deletepost/deletepost.component';
import { DeleteprofileComponent } from './users/deleteprofile/deleteprofile.component';
import { AdvancesearchComponent } from './postlist/advancesearch/advancesearch.component';
import { LoaderComponent } from './core/loader/loader.component';
import { NgHttpLoaderModule } from "ng-http-loader";
import { NgxPaginationModule } from "ngx-pagination";
import { TermsComponent } from './core/policy/terms/terms.component';
import { PrivacyComponent } from './core/policy/privacy/privacy.component';
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
    SinglepostComponent,
    DeletepostComponent,
    DeleteprofileComponent,
    AdvancesearchComponent,
    TermsComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    SuiModule,
    NgHttpLoaderModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    LocationService,
    ValidationService,
    ProfileService,
    PostService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoaderComponent],
})
export class AppModule {}
