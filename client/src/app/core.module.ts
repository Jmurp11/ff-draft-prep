import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth/auth.service';
import { TargetService } from './target/target.service';
import { NoteService } from './notes/note.service';

@NgModule({
  providers: [
    AuthService,
    NoteService,
    TargetService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class CoreModule { }
