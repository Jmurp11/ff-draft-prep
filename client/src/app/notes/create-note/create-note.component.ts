import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { _filter, findItemWithPropertyValue } from '../../util/lib/objects';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApolloAngularSDK, PlayerArgs } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  players$: Observable<any>;
  players: any[];
  playersSub: Subscription;
  formSub: Subscription;
  isPrivate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<CreateNoteComponent>,
    private apolloSdk: ApolloAngularSDK
  ) {
    this.isPrivate = false;
  }

  ngOnInit(): void {
    this.title = 'Create Note';

    this.form = new FormGroup({
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5)]
      }),
      isPrivate: new FormControl(null, {
        updateOn: 'blur'
      }),
    });

    if (this.input) {
      this.form.get('player').setValue(this.input.payload.player);
    }

    this.playersSub = this.getPlayers()
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
      ).subscribe(val => this.players = val);

    this.formSub = this.form.get('player')
      .valueChanges
      .subscribe(val => {
        const player = findItemWithPropertyValue(this.players, 'name', val);
        if (player) {
          this.form.get('player').setValue(player);
        }
      });
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

  onSubmit() {
    this.form.get('isPrivate').setValue(this.isPrivate);
    this.dialogRef.close(this.form.value);
  }

  reset() {
    return this.form.get('player').reset();
  }

  displayPlayer(player: any) {
    return player && player.name ? `${player.name} ${player.position} - ${player.team.abbreviation}` : '';
  }

  ngOnDestroy() {
    this.playersSub.unsubscribe();
    this.formSub.unsubscribe();
  }
}
