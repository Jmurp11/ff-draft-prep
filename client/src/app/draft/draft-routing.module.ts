import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftComponent } from './draft.component';
import { AuthGuard } from '../auth/auth.guard';
import { DraftLobbyComponent } from './draft-lobby/draft-lobby.component';
import { DraftPrepComponent } from './draft-prep/draft-prep.component';
import { MockDraftComponent } from './mock-draft/mock-draft.component';


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
    }
];

@NgModule({
    imports: [RouterModule.forChild(draftRoutes)],
    exports: [RouterModule]
})
export class DraftRoutingModule { }
