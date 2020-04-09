import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { TargetDialogComponent } from './target-dialog/target-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TargetService } from './target.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  targetsInput: any;

  @Input()
  userInput: string;

  @Input()
  loadingInput: boolean;

  targets: any[];
  loading: boolean;
  user: string;
  deleteStatus$: Subscription;
  hasTargets: boolean;
  rounds: number[];
  dismiss = 'Dismiss';
  displayedColumns = ['name', 'team', 'position', 'round', 'clear'];

  constructor(
    private dialog: MatDialog,
    private _target: TargetService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;

    this.deleteStatus$ = this._target.deleteStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, this.dismiss);
        this._target.resetResponse();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'loadingInput': {
            this.loading = this.loadingInput;
            break;
          }
          case 'targetsInput': {
            this.targets = this.targetsInput || [];
            this.targets.sort((a, b) => a.round - b.round);
            if (this.targets.length > 0) {
              this.hasTargets = true;
            }
            break;
          }
          case 'userInput': {
            this.user = this.userInput;
            break;
          }
        }
      }
    }
  }

  addTarget() {
    const dialogRef = this.dialog.open(TargetDialogComponent, {
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  deleteTarget(target: any) {
    this._target.deleteTarget(target.id, this.user);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.deleteStatus$) {
      this.deleteStatus$.unsubscribe();
    }
  }
}
