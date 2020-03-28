import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteComponent } from './notes/note/note.component';
import { HomeComponent } from './home/home.component';
import { UserNotesComponent } from './notes/user-notes/user-notes.component';
import { PublicNotesComponent } from './notes/public-notes/public-notes.component';
import { NoteDialogComponent } from './notes/note-dialog/note-dialog.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { LikedNotesComponent } from './notes/liked-notes/liked-notes.component';
import { AuthModule } from './auth/auth.module';
import { TargetModule } from './target/target.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { CoreModule } from './core.module';
import { RouterModule } from '@angular/router';
import { DraftModule } from './draft/draft.module';
import { NoteModule } from './notes/note.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent
  ],
  entryComponents: [NoteDialogComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DraftModule,
    HttpClientModule,
    LayoutModule,
    NoteModule,
    ProfileModule,
    RouterModule,
    SharedModule,
    TargetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
