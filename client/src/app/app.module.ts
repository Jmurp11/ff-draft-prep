import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { HomeComponent } from './home/home.component';
import { UserNotesComponent } from './notes/user-notes/user-notes.component';
import { PublicNotesComponent } from './notes/public-notes/public-notes.component';
import { NoteDialogComponent } from './notes/note-dialog/note-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LikedNotesComponent } from './notes/liked-notes/liked-notes.component';
import { AuthModule } from './auth/auth.module';
import { TargetModule } from './target/target.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { CoreModule } from './core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerTableComponent,
    DashboardComponent,
    NoteComponent,
    NoteCardComponent,
    HomeComponent,
    UserNotesComponent,
    PublicNotesComponent,
    NoteDialogComponent,
    FooterComponent,
    SidenavComponent,
    LikedNotesComponent
  ],
  entryComponents: [NoteDialogComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ProfileModule,
    RouterModule,
    SharedModule,
    TargetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
