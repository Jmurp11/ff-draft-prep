import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { PlayerTableComponent } from './draft/player-table/player-table.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: async () => {
      const module = await import('./auth/auth.module');
      return module.AuthModule;
    }
  },
  {
    path: 'user',
    loadChildren: async () => {
      const module = await import('./profile/profile.module');
      return module.ProfileModule;
    }
  },
  {
    path: 'prep',
    loadChildren: async () => {
      const module = await import('./draft/draft.module');
      return module.DraftModule;
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
