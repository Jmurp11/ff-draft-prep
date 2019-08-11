import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { TeamComponent } from './team/team.component';
import { LeagueFormComponent } from './league-form/league-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerTableComponent,
    TeamComponent,
    LeagueFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
