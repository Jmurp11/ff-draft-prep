import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const profileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':username',
        component: ProfileDetailComponent
      },
      {
        path: ':username/edit',
        component: EditProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
