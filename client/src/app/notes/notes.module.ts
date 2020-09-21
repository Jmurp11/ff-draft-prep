/**
import { NgModule } from '@angular/core';
import { CreateNoteComponent } from './create-note/create-note.component';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateNoteComponent,
    NoteCardComponent,
    NoteListComponent
  ],
  exports: [
    CreateNoteComponent,
    NoteCardComponent,
    NoteListComponent
  ],
  imports: [
    NotesRoutingModule,
    RouterModule.forChild(NotesRoutingModule),
    SharedModule
  ],
  entryComponents: [CreateNoteComponent],
  providers: []
})
export class NotesModule { }
*/
