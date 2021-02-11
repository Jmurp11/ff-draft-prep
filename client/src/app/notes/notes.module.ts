import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FolderListComponent } from './folder-list/folder-list.component';

@NgModule({
  declarations: [
    NoteComponent,
    NoteListComponent,
    FolderListComponent
  ],
  exports: [
    FolderListComponent,
    NoteComponent,
    NoteListComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [],
  providers: []
})
export class NotesModule { }

