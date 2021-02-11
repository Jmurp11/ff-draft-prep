import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FooterComponent } from './ui/footer/footer.component';

import { SharedModule } from './shared/shared.module';
import { NavHeaderComponent } from './ui/nav-header/nav-header.component';
import { NavContentComponent } from './ui/nav-content/nav-content.component';
import { SearchbarComponent } from './ui/searchbar/searchbar.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotesModule } from './notes/notes.module';
import { ProfileModule } from './profile/profile.module';
import { PlayersComponent } from './players/players.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { GenericTableComponent } from './ui/generic-table/generic-table.component';
import { ProjectionDataComponent } from './players/player-card/projection-data/projection-data.component';
import { AccordionComponent } from './players/player-card/accordion/accordion.component';
import { TeamInfoComponent } from './players/player-card/team-info/team-info.component';
import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { PlayerFilterComponent } from './players/player-filter/player-filter.component';
import { TargetsComponent } from './targets/targets.component';
import { CreateTargetComponent } from './targets/create-target/create-target.component';
import { TargetListComponent } from './targets/target-list/target-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ToolbarComponent,
    GenericTableComponent,
    LayoutComponent,
    FooterComponent,
    NavHeaderComponent,
    NavContentComponent,
    SearchbarComponent,
    PlayersComponent,
    PlayerListComponent,
    PlayerCardComponent,
    ProjectionDataComponent,
    AccordionComponent,
    TeamInfoComponent,
    CreateNoteComponent,
    PlayerFilterComponent,
    TargetsComponent,
    CreateTargetComponent,
    TargetListComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    ProfileModule,
    NotesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
