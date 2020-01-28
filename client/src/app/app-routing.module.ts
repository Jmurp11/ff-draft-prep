import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NoteSideDrawerComponent } from './note-side-drawer/note-side-drawer.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: NoteSideDrawerComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: CreateProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
