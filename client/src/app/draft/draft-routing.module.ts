import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftComponent } from './draft.component';
import { AuthGuard } from '../auth/auth.guard';
import { DraftLobbyComponent } from './draft-lobby/draft-lobby.component';
import { DraftPrepComponent } from './draft-prep/draft-prep.component';
import { MockDraftComponent } from './mock-draft/mock-draft.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';

const draftRoutes: Routes = [
    {
        path: 'draft',
        component: DraftComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: ':username/draft-prep',
                component: DraftPrepComponent
            },
            {
                path: 'draft-lobby',
                component: DraftLobbyComponent,
                children: [
                    {
                        path: 'mock-draft',
                        component: MockDraftComponent
                    }
                ]
            }
        ]
    },
    {
      path: 'player',
      component: PlayerComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: ':id',
          component: PlayerDetailComponent
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(draftRoutes)],
    exports: [RouterModule]
})
export class DraftRoutingModule { }
