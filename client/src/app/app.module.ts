import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as ch from 'ng2-charts';
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
import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { PlayerFilterComponent } from './players/player-filter/player-filter.component';
import { TargetsComponent } from './targets/targets.component';
import { CreateTargetComponent } from './targets/create-target/create-target.component';
import { TargetListComponent } from './targets/target-list/target-list.component';
import { ChartComponent } from './ui/chart/chart.component';
import { PlayerComponent } from './players/player/player.component';
import { HeaderComponent } from './players/player/header/header.component';
import { StatSummaryComponent } from './players/player/stat-summary/stat-summary.component';
import { PpgCardComponent } from './players/player/stat-summary/ppg-card/ppg-card.component';
import { YardsCardComponent } from './players/player/stat-summary/yards-card/yards-card.component';
import { TdCardComponent } from './players/player/stat-summary/td-card/td-card.component';
import { TargetShareCardComponent } from './players/player/stat-summary/target-share-card/target-share-card.component';
import { TouchesCardComponent } from './players/player/stat-summary/touches-card/touches-card.component';
import { PassingCardComponent } from './players/player/stat-summary/passing-card/passing-card.component';
import { ScheduleComponent } from './players/player/schedule/schedule.component';
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
    CreateNoteComponent,
    PlayerFilterComponent,
    TargetsComponent,
    CreateTargetComponent,
    TargetListComponent,
    ChartComponent,
    PlayerComponent,
    HeaderComponent,
    StatSummaryComponent,
    PpgCardComponent,
    YardsCardComponent,
    TdCardComponent,
    TargetShareCardComponent,
    TouchesCardComponent,
    PassingCardComponent,
    ScheduleComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    ch.ChartsModule,
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
