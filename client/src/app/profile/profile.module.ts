/**
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    RouterModule.forChild(ProfileRoutingModule),
    SharedModule
  ],
  entryComponents: [],
  providers: []
})
export class ProfileModule { }
*/
