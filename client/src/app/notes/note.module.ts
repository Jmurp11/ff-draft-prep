import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NoteComponent } from './note/note.component';
import { DraftNotesComponent } from './draft-notes/draft-notes.component';
import { PublicNotesComponent } from './public-notes/public-notes.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { LikedNotesComponent } from './liked-notes/liked-notes.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';


@NgModule({
    declarations: [
        NoteComponent,
        DraftNotesComponent,
        PublicNotesComponent,
        UserNotesComponent,
        LikedNotesComponent,
        NoteDialogComponent
    ],
    exports: [
        NoteComponent,
        DraftNotesComponent,
        PublicNotesComponent,
        UserNotesComponent,
        LikedNotesComponent,
        NoteDialogComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    entryComponents: [NoteDialogComponent]
})
export class NoteModule { }