import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./core/about/about.component";
import { ContactComponent } from "./core/contact/contact.component";
import { PagenotfoundComponent } from "./core/pagenotfound/pagenotfound.component";
import { AuthGuard } from "./guard/auth.guard";
import { CreatepostComponent } from "./post/createpost/createpost.component";
import { DeletepostComponent } from "./post/deletepost/deletepost.component";
import { UpdatepostComponent } from "./post/updatepost/updatepost.component";
import { MyfeedComponent } from "./postlist/myfeed/myfeed.component";
import { SinglepostComponent } from "./postlist/singlepost/singlepost.component";
import { DeleteprofileComponent } from "./users/deleteprofile/deleteprofile.component";
import { CreateprofileComponent } from "./users/createprofile/createprofile.component";
import { LoginComponent } from "./users/login/login.component";
import { ProfileComponent } from "./users/profile/profile.component";
import { RegisterComponent } from "./users/register/register.component";
import { UpdateprofileComponent } from "./users/updateprofile/updateprofile.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  {
    path: "updateprofile",
    canActivate: [AuthGuard],
    component: UpdateprofileComponent,
  },
  {
    path: "createpost",
    canActivate: [AuthGuard],
    component: CreatepostComponent,
  },
  {
    path: "deletepost/:userid",
    canActivate: [AuthGuard],
    component: DeletepostComponent,
  },
  { path: "createprofile", component: CreateprofileComponent },
  {
    path: "updatepost/:postid",
    canActivate: [AuthGuard],
    component: UpdatepostComponent,
  },
  { path: "myfeed", canActivate: [AuthGuard], component: MyfeedComponent },
  {
    path: "updateprofile",
    canActivate: [AuthGuard],
    component: UpdateprofileComponent,
  },
  {
    path: "deleteprofile/:userid",
    canActivate: [AuthGuard],
    component: DeleteprofileComponent,
  },
  {
    path: "post/:postid",
    canActivate: [AuthGuard],
    component: SinglepostComponent,
  },

  { path: "404", component: PagenotfoundComponent },
  { path: "", component: RegisterComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
