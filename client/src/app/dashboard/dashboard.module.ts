import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesModule } from '../notes/notes.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    NotesModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [],
  providers: []
})
export class DashboardModule { }
