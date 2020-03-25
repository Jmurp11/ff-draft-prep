import { NgModule } from '@angular/core';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from '../graphql.module';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoadingSpinner
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    LoadingSpinner,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
