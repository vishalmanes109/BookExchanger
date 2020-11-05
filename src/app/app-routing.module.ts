import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';
import { CreatepostComponent } from './post/createpost/createpost.component';
import { UpdatepostComponent } from './post/updatepost/updatepost.component';
import { MyfeedComponent } from './postlist/myfeed/myfeed.component';
import { CreateprofileComponent } from './users/createprofile/createprofile.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { UpdateprofileComponent } from './users/updateprofile/updateprofile.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'updateprofile',component:UpdateprofileComponent},
  {path:'createpost',component:CreatepostComponent},
  {path:'createprofile',component:CreateprofileComponent},
  {path:'updatepost',component:UpdatepostComponent},
  {path:'myfeed',component:MyfeedComponent},
  {path:'',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
