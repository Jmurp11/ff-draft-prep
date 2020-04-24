import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'a',
    loadChildren: async () => {
      const module = await import('./auth/auth.module');
      return module.AuthModule;
    }
  },
  {
    path: 'u',
    loadChildren: async () => {
      const module = await import('./profile/profile.module');
      return module.ProfileModule;
    }
  },
  {
    path: 'd',
    loadChildren: async () => {
      const module = await import('./draft/draft.module');
      return module.DraftModule;
    }
  },
  {
    path: 'n',
    loadChildren: async () => {
      const module = await import('./notes/note.module');
      return module.NoteModule;
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
