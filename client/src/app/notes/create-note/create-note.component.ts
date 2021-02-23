import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { _filter, findItemWithPropertyValue } from '../../util/lib/objects';
import { ApolloAngularSDK, Folder, PlayerArgs } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  subSink: Subscription;
  form: FormGroup;
  isLoading: boolean;
  title: string;
  players: any[];
  folders: Pick<Folder, 'id' | 'title'>[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    private apolloSdk: ApolloAngularSDK,
    public dialogRef: MatDialogRef<CreateNoteComponent>
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();

    this.title = 'Create Note';

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      folder: new FormControl(null, {
        updateOn: 'change',
      }),
      content: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(300)]
      })
    });

    if (this.input) {
      this.form.get('player').setValue(this.input.payload.player);
    }

    if (!this.input.payload.isNew && this.input.payload.id) {
      console.log('in')
      this.isLoading = true;
      this.subSink.add(
        this.apolloSdk.noteWatch(
          {
            data: {
              id: this.input.payload.id
            }
          }
        ).valueChanges
        .subscribe(({ data, loading }) => {
          this.isLoading = loading;
          this.form.get('title').setValue(data.note.title);
          this.form.get('player').setValue(data.note.player);
          this.form.get('folder').setValue(data.note.folder);
          this.form.get('content').setValue(data.note.body);
        })
      );
    }

    this.subSink.add(
      this.getPlayers()
        .pipe(
          switchMap(output => {
            return this.form.get('player')
              .valueChanges
              .pipe(
                startWith(''),
                map(val => {
                  if (typeof val === 'string') {
                    return _filter<any>(output.data.players, 'name', val);
                  }
                })
              );
          })
        ).subscribe(val => this.players = val)
    );

    this.subSink.add(
      this.apolloSdk.foldersWatch(
        {
          data: {
            filterType: 'byCurrentUser'
          }
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.folders = data.folders
        })
    );

    this.subSink.add(
      this.form.get('player')
        .valueChanges
        .subscribe(val => {
          const player = findItemWithPropertyValue(this.players, 'name', val);
          if (player) {
            this.form.get('player').setValue(player);
          }
        })
    );
  }

  getPlayers() {
    const playersInput: PlayerArgs = {
      filterType: 'byNotStatus',
      status: 'Inactive'
    };

    return this.apolloSdk.playersWatch({
      data: playersInput
    })
      .valueChanges;
  }

  reset() {
    return this.form.get('player').reset();
  }

  displayPlayer(player: any) {
    return player && player.name ? `${player.name} ${player.position} - ${player.team.abbreviation}` : '';
  }

  displayFolder(folder: any) {
    return folder && folder.title ? `${folder.title}` : '';
  }


  onSubmit() {
    const returnData = {
      form: this.form.value,
      id: this.input.payload.id,
    };

    this.dialogRef.close(returnData);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
