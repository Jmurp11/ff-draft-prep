import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: 'profile/',
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
