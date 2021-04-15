import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from '../graphql.module';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MentionModule } from 'angular-mentions';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    MentionModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    LoadingSpinnerComponent,
    MentionModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
