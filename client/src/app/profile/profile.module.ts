import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterModule } from '@angular/router';
import { NoteModule } from '../notes/note.module';
import { TargetModule } from '../target/target.module';

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
    RouterModule,
    ProfileRoutingModule,
    NoteModule,
    TargetModule,
    SharedModule
  ]
})
export class ProfileModule { }
