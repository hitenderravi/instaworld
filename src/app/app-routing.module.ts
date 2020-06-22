import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,


} from "@angular/fire/auth-guard"
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { UserComponent } from './components/user/user.component';
import { OtheruserComponent } from './pages/otheruser/otheruser.component';
import { OtheruserinfoComponent } from './components/otheruserinfo/otheruserinfo.component';

const redirectUnauthorizedToLogin=()=> redirectUnauthorizedTo(['signin'])
const redirectLoggedInToHome=()=>redirectLoggedInTo([''])

const routes: Routes = [
{
  path:'signin',
  component:SigninComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectLoggedInToHome}
},
{
  path:'signup',
  component:SignupComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectLoggedInToHome}
},{
  path:'addpost',
  component:AddpostComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectUnauthorizedToLogin}
},
   
// { path: 'other/:id',
//  component: OtheruserinfoComponent ,
// pathMatch: 'full',
//   canActivate:[AngularFireAuthGuard],
//   data:{authGuardPipe:redirectUnauthorizedToLogin},
// },

{
  path:'',
  pathMatch: 'full',
  component:UserinfoComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectUnauthorizedToLogin},
  outlet:'secondary'
},

{
  path:'other/:id',
   component:OtheruserComponent  ,
   pathMatch: 'full',
   canActivate:[AngularFireAuthGuard],
   data:{authGuardPipe:redirectUnauthorizedToLogin},
 },


{
  path:'',
  pathMatch: 'full',
  component:HomeComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectUnauthorizedToLogin}
},

{
  path:"**",
  component:PagenotfoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
