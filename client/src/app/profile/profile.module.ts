import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ProfileComponent,
    ProfileDetailComponent
  ],
  exports: [
    EditProfileComponent,
    ProfileComponent,
    ProfileDetailComponent
  ],
  imports: [
    // ProfileRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ProfileModule { }
