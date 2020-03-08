import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphQLModule } from './graphql.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { UserNotesComponent } from './notes/user-notes/user-notes.component';
import { PublicNotesComponent } from './notes/public-notes/public-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerTableComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EditProfileComponent,
    NoteComponent,
    NoteCardComponent,
    LoadingSpinner,
    HomeComponent,
    UserNotesComponent,
    PublicNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
