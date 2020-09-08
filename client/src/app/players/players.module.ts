import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlayersComponent } from './players.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerFilterComponent } from './player-filter/player-filter.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { ProjectionTableComponent } from './projection-table/projection-table.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { FilteredDataService } from './filtered-data.service';
import { FilterService } from './filter.service';
import { PanelStateService } from './panel-state.service';
/**
import { PlayerStoreService } from './player-store.service';
import { PlayersRoutingModule } from './players-routing.module';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerCardComponent,
    PlayerListComponent,
    PlayerFilterComponent,
    PlayerTableComponent,
    ProjectionTableComponent,
    TeamInfoComponent
  ],
  exports: [
    PlayersComponent,
    PlayerCardComponent,
    PlayerListComponent,
    PlayerFilterComponent,
    PlayerTableComponent,
    ProjectionTableComponent,
    TeamInfoComponent
  ],
  imports: [
    PlayersRoutingModule,
    RouterModule.forChild(PlayersRoutingModule),
    SharedModule
  ],
  entryComponents: [],
  providers: [
    FilteredDataService,
    FilterService,
    PanelStateService,
    PlayerStoreService
  ]
})
export class PlayersModule { }
*/
