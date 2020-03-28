import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TargetComponent } from './target.component';
import { TargetDialogComponent } from './target-dialog/target-dialog.component';
import { AddTargetComponent } from './add-target/add-target.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddTargetComponent,
    TargetComponent,
    TargetDialogComponent
  ],
  exports: [
    AddTargetComponent,
    TargetComponent,
    TargetDialogComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [TargetDialogComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class TargetModule { }
