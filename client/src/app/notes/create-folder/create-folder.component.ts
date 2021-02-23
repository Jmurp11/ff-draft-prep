import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subSink: Subscription = new Subscription;
  title: string;
  loading: boolean;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<CreateFolderComponent>
  ) { }

  ngOnInit(): void {
    this.title = 'Create Folder';

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    if (!this.input.isNew && this.input.id) {
      this.loading = true;

      this.subSink.add(
        this.apolloSdk.folderWatch(
          {
            data: {
              filterType: 'byId',
              id: this.input.id
            }
          }
        )
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.form.get('title').setValue(data.folder.title)
        })
      );
    }
  }

  onSubmit() {
    const returnData = {
      form: this.form.value,
      id: this.input.id
    }
    this.dialogRef.close(returnData);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
