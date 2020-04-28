import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { TargetService } from '../target.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, startWith, filter } from 'rxjs/operators';
import { TargetDialogComponent } from '../target-dialog/target-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { players } from '../../notes/queries';
import { User } from '../../auth/user.model';
import { Player } from '../../draft/player/player.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.css']
})
export class AddTargetComponent implements AfterContentInit, OnDestroy {
  user$: Subscription;
  addStatus$: Subscription;
  clearForm$: Subscription;
  players$: Subscription;
  popPlayer$: Subscription;
  curPlayer$: Subscription;
  filteredOptions: Observable<any[]>;
  form: FormGroup;
  user: User;
  currentPlayer: Player;
  isPlayerPreset: boolean;
  loading: boolean;
  players: any[];
  rounds: number[];
  dismiss = 'Dismiss';
  playerIsValid = true;
  roundIsValid = true;

  constructor(
    private apollo: Apollo,
    public dialogRef: MatDialogRef<TargetDialogComponent>,
    private _target: TargetService,
    private store: Store<fromApp.AppState>,
    private snackbar: MatSnackBar) { }

  ngAfterContentInit() {
    this.loading = true;
    this.players = [];
    this.rounds = [];

    for (let i = 1; i < 17; i++) {
      this.rounds.push(i);
    }

    this.form = new FormGroup({
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rounds: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.addStatus$ = this._target.targetStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, this.dismiss);
        this.resetForm();
        this._target.resetResponse();
      }
    });

    this.clearForm$ = this._target.clearTargetForm.subscribe(clear => {
      if (clear) {
        this.resetForm();
        this._target.resetForm(false);
      }
    });

    this.user$ = this.store.select('user')
      .subscribe(data => this.user = data.user);

    this.popPlayer$ = this._target.populatePlayer.subscribe(populate => {
      if (!populate) {
        this.isPlayerPreset = false;
        this.currentPlayer = null;
      } else {
        this.isPlayerPreset = true;

        this.curPlayer$ = this.store.select('player')
          .subscribe(data => {
            this.currentPlayer = data.player;
            this.form.get('player').setValue(this.currentPlayer);
          });
      }
    });

    this.players$ = this.apollo.watchQuery<any>({
      query: players
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        data.players.forEach((player: any) => {
          this.players.push(player);
        });
      });

    this.filteredOptions = this.form.get('player').valueChanges
      .pipe(
        startWith(''),
        filter(value => value !== null),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => this._filter(value))
      );

    this.form.get('player').statusChanges.subscribe(status => {
      this.playerIsValid = status === 'VALID';
    });

    this.form.get('rounds').statusChanges.subscribe(status => {
      this.roundIsValid = status === 'VALID';
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const user = this.user.id;
    const player = this.form.get('player').value;
    const round = this.form.get('rounds').value;

    this.loading = true;

    this._target.createTarget(user, player.id, round);

    this.dialogRef.close();
  }

  _filter(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.players.filter(player => player.name.toLowerCase().includes(filterValue));
    }
  }

  displayFn(player: any): string {
    if (player) {
      return `${player.name} ${player.team.abbreviation} - ${player.position}`;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  resetForm() {
    this.form.reset();
    this.playerIsValid = true;
    this.roundIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.addStatus$) {
      this.addStatus$.unsubscribe();
    }
    if (this.players$) {
      this.players$.unsubscribe();
    }
    if (this.clearForm$) {
      this.clearForm$.unsubscribe();
    }
    if (this.popPlayer$) {
      this.popPlayer$.unsubscribe();
    }
    if (this.curPlayer$) {
      this.curPlayer$.unsubscribe();
    }
  }
}
