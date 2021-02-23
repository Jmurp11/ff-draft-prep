import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { _filter } from 'src/app/util/lib/objects';
import { ApolloAngularSDK, PlayerArgs } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-create-target',
  templateUrl: './create-target.component.html',
  styleUrls: ['./create-target.component.scss']
})
export class CreateTargetComponent implements OnInit, OnDestroy {

  subSink: Subscription;
  form: FormGroup;
  isLoading: boolean;
  title: string;
  players: any[];
  rounds: number[] = Array.from(Array(17).keys());

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    private apolloSdk: ApolloAngularSDK,
    public dialogRef: MatDialogRef<CreateTargetComponent>
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();

    this.title = 'Add Target';

    this.form = new FormGroup({
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      round: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    if (this.input) {
      this.form.get('player').setValue(this.input.payload.player);
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
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
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

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
