import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './ui/layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { FolderListComponent } from './notes/folder-list/folder-list.component';
import { PlayersComponent } from './players/players.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerComponent } from './players/player/player.component';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'players',
        component: PlayersComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'list',
            component: PlayerListComponent
          },
          {
            path: ':id',
            component: PlayerComponent
          }
        ]
      },
      {
        path: 'folder-list',
        component: FolderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: '**',
        redirectTo: 'access/error/404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
