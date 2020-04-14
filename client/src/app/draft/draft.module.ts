import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DraftComponent } from './draft.component';
import { PlayerTableComponent } from './player/player-table/player-table.component';
import { DraftPrepComponent } from './draft-prep/draft-prep.component';
import { DraftLobbyComponent } from './draft-lobby/draft-lobby.component';
import { MockDraftComponent } from './mock-draft/mock-draft.component';
import { DraftRoutingModule } from './draft-routing.module';
import { NoteModule } from '../notes/note.module';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { PlayerComponent } from './player/player.component';
import { PlayerStatsComponent } from './player/player-detail/player-stats/player-stats.component';

@NgModule({
  declarations: [
    DraftComponent,
    DraftLobbyComponent,
    DraftPrepComponent,
    MockDraftComponent,
    PlayerComponent,
    PlayerTableComponent,
    PlayerDetailComponent,
    PlayerStatsComponent
  ],
  exports: [
    DraftComponent,
    DraftLobbyComponent,
    DraftPrepComponent,
    MockDraftComponent,
    PlayerComponent,
    PlayerTableComponent,
    PlayerDetailComponent
  ],
  imports: [
    RouterModule,
    DraftRoutingModule,
    NoteModule,
    SharedModule
  ]
})
export class DraftModule { }
