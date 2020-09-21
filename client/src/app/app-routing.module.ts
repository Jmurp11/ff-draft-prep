import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './ui/layout/layout.component';
import { NotesComponent } from './notes/notes.component';
import { PlayersComponent } from './players/players.component';
import { ProfileComponent } from './profile/profile.component';
import { DraftComponent } from './drafts/draft/draft.component';
import { DraftSetUpComponent } from './drafts/draft-set-up/draft-set-up.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminFunctionsComponent } from './admin/admin-functions/admin-functions.component';


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
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'update-data',
            component: AdminFunctionsComponent,
          },
        ]
      },
      {
        path: 'drafts',
        component: DraftComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'draft-set-up',
            component: DraftSetUpComponent,
          },
          {
            path: 'draft-list',
            component: DraftSetUpComponent,
          },
          {
            path: 'draft',
            component: DraftComponent,
          },
        ]
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'players',
        component: PlayersComponent,
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
