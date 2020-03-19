import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Target } from './target.model';
import { targets } from './queries';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TargetDialogComponent } from './target-dialog/target-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TargetService } from './target.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit, OnDestroy {
  targets$: Subscription;
  curUser$: Subscription;
  deleteStatus$: Subscription;
  loading: boolean;
  hasTargets: boolean;
  targets: Target[];
  curUser: User;
  rounds: number[];
  dismiss = 'Dismiss';
  displayedColumns = ['name', 'team', 'position', 'round', 'clear'];

  constructor(
    private _auth: AuthService,
    private apollo: Apollo,
    private dialog: MatDialog,
    private _target: TargetService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;

    this.rounds = [];

    this.curUser$ = this._auth.user.subscribe(user => {
      this.curUser = user;
    });

    this.targets$ = this.apollo.watchQuery<any>({
      query: targets,
      variables: {
        user: this.curUser.id
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.targets = data.targets;
        if (this.targets.length > 0) {
          this.hasTargets = true;
          this.targets.forEach((target: any) => {
            this.rounds.push(target.round);
          });
        } else {
          this.hasTargets = false;
        }
      });

    this.deleteStatus$ = this._target.deleteStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, this.dismiss);
        this._target.resetResponse();
      }
    });
  }

  addTarget() {
    const dialogRef = this.dialog.open(TargetDialogComponent, {
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  deleteTarget(target: any) {
    this._target.deleteTarget(target.id);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.targets$) {
      this.targets$.unsubscribe();
    }
    if (this.deleteStatus$) {
      this.deleteStatus$.unsubscribe();
    }
  }
}
