import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerArgs, ApolloAngularSDK } from '../../sdk/generated/graphql';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { _filter } from '../../util/lib/objects';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.scss']
})
export class AddTargetComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading: boolean;
  title: string;
  rounds: number[];
  players$: Observable<any>;
  players: any[];
  playersSub: Subscription;
  formSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<AddTargetComponent>,
    private apolloSdk: ApolloAngularSDK
  ) {
    this.rounds = [...Array(16).keys()];
  }

  ngOnInit(): void {
    this.title = 'Add Target';

    this.form = new FormGroup({
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      round: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
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
    this.dialogRef.close(this.form.value);
  }

  reset() {
    return this.form.get('player').reset();
  }

  displayPlayer(player: any) {
    return player && player.name ? `${player.name} ${player.position} - ${player.team.abbreviation}` : '';
  }

  ngOnDestroy() {
    if (this.playersSub) {
      this.playersSub.unsubscribe();
    }
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
