import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from '../graphql.module';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
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
    LoadingSpinnerComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
