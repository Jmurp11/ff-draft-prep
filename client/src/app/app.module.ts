import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth//login/login.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { BreadcrumbComponent } from './ui/breadcrumb/breadcrumb.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ThemeService } from './ui/theme.service';
import { RoutePartsService } from './ui/router-parts.service';
import { TargetComponent } from './target/target.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { PlayersComponent } from './players/players.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { PlayerTableComponent } from './players/player-table/player-table.component';
import { DraftsComponent } from './drafts/drafts.component';
import { DraftComponent } from './drafts/draft/draft.component';
import { DraftListComponent } from './drafts/draft-list/draft-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectionTableComponent } from './players/projection-table/projection-table.component';
import { PlayerFilterComponent } from './players/player-filter/player-filter.component';
import { TeamInfoComponent } from './players/team-info/team-info.component';
import { TargetTableComponent } from './target/target-table/target-table.component';
import { AddTargetComponent } from './target/add-target/add-target.component';
import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { SharedModule } from './shared/shared.module';
import { DraftSetUpComponent } from './drafts/draft-set-up/draft-set-up.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminFunctionsComponent } from './admin/admin-functions/admin-functions.component';
import { SidenavContentComponent } from './ui/sidenav-content/sidenav-content.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    DashboardComponent,
    ToolbarComponent,
    LayoutComponent,
    FooterComponent,
    TargetComponent,
    NotesComponent,
    NoteCardComponent,
    NoteListComponent,
    PlayersComponent,
    PlayerListComponent,
    PlayerCardComponent,
    PlayerTableComponent,
    DraftsComponent,
    DraftComponent,
    DraftListComponent,
    ProfileComponent,
    ProjectionTableComponent,
    PlayerFilterComponent,
    TeamInfoComponent,
    TargetTableComponent,
    AddTargetComponent,
    CreateNoteComponent,
    DraftSetUpComponent,
    AdminComponent,
    UsersComponent,
    AdminFunctionsComponent,
    SidenavContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ThemeService,
    RoutePartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
