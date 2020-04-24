import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotePageComponent } from './note-page/note-page.component';
import { AuthGuard } from '../auth/auth.guard';
import { NoteDetailComponent } from './note-detail/note-detail.component';


const noteRoutes: Routes = [
  {
    path: 'note',
    component: NotePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: NoteDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(noteRoutes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
