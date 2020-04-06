import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreateNoteComponent } from './create-note/create-note.component';

import { NoteComponent } from './note/note.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { NoteService } from './note.service';
import { NotesMutationsService } from './notes-mutations.service';
import { NotesQueriesService } from './notes-queries.service';


@NgModule({
    declarations: [
        CreateNoteComponent,
        NoteComponent,
        NoteDialogComponent
    ],
    exports: [
        CreateNoteComponent,
        NoteComponent,
        NoteDialogComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    entryComponents: [NoteDialogComponent],
    providers: [
      NoteService,
      NotesMutationsService,
      NotesQueriesService
    ]
})
export class NoteModule { }
