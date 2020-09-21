/**
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TargetComponent } from './target.component';
import { TargetsRoutingModule } from './target-routing.module';
import { TargetsQueryService } from './targets-query.service';
import { AddTargetComponent } from './add-target/add-target.component';

@NgModule({
  declarations: [
    TargetComponent,
    AddTargetComponent
  ],
  exports: [
    TargetComponent,
    AddTargetComponent
  ],
  imports: [
    TargetsRoutingModule,
    RouterModule.forChild(TargetsRoutingModule),
    SharedModule
  ],
  entryComponents: [AddTargetComponent],
  providers: [
    TargetsQueryService
  ]
})
export class TargetModule { }
*/
