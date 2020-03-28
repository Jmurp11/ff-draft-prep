import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DraftComponent } from './draft.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { DraftPrepComponent } from './draft-prep/draft-prep.component';
import { DraftLobbyComponent } from './draft-lobby/draft-lobby.component';
import { MockDraftComponent } from './mock-draft/mock-draft.component';
import { DraftRoutingModule } from './draft-routing.module';
import { NoteModule } from '../notes/note.module';

@NgModule({
  declarations: [
    DraftComponent,
    DraftLobbyComponent,
    DraftPrepComponent,
    MockDraftComponent,
    PlayerTableComponent
  ],
  exports: [
    DraftComponent,
    DraftLobbyComponent,
    DraftPrepComponent,
    MockDraftComponent,
    PlayerTableComponent
  ],
  imports: [
    RouterModule,
    DraftRoutingModule,
    NoteModule,
    SharedModule
  ]
})
export class DraftModule { }