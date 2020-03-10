import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { TargetService } from '../target.service';
import { MatDialogRef } from '@angular/material/dialog';
import { map, startWith, filter } from 'rxjs/operators';
import { TargetDialogComponent } from '../target-dialog/target-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { players } from '../../notes/queries';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.css']
})
export class AddTargetComponent implements AfterContentInit, OnDestroy {
  user$: Subscription;
  addStatus$: Subscription;
  deleteStatus$: Subscription;
  clearForm$: Subscription;
  players$: Subscription;
  filteredOptions: Observable<any[]>;
  form: FormGroup;
  userId: string;
  loading: boolean;
  players: any[];
  rounds: number[];
  dismiss = 'Dismiss';
  playerIsValid = true;
  roundIsValid = true;

  constructor(
    private apollo: Apollo,
    private _auth: AuthService,
    public dialogRef: MatDialogRef<TargetDialogComponent>,
    private _target: TargetService,
    private snackbar: MatSnackBar) { }

  ngAfterContentInit() {
    this.loading = true;
    this.players = [];

    for (let i = 1; i < 14; i++) {
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
      }
    });

    this.clearForm$ = this._target.clearTargetForm.subscribe(clear => {
      if (clear) {
        this.resetForm();
        this._target.resetForm(false);
      }
    });

    this.user$ = this._auth.user.subscribe(user => {
      this.userId = user.id;
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

    this.form.get('round').statusChanges.subscribe(status => {
      this.roundIsValid = status === 'VALID';
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const user = this.userId;
    const player = this.form.get('player').value;
    const round = this.form.get('round').value;

    this.loading = true;

    this._target.createTarget(user, player, round);

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
      return `${player.name} ${player.team.team.abbreviation} - ${player.position}`;
    }
  }

  onCancel() {
    this.form.reset();
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
    this.user$.unsubscribe();
    this.addStatus$.unsubscribe();
    this.deleteStatus$.unsubscribe();
    this.players$.unsubscribe();
    this.clearForm$.unsubscribe();
  }
}
