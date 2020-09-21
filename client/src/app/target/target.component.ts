import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddTargetComponent } from './add-target/add-target.component';
import { TargetInput, TargetsDocument, ApolloAngularSDK } from '../sdk/generated/graphql';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit, OnDestroy {
  addTargetSub: any;

  constructor(
    private dialog: MatDialog,
    private apolloSdk: ApolloAngularSDK,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  openAddTargetDialog() {

    const dialogRef: MatDialogRef<any> = this.dialog.open(AddTargetComponent, {
      width: '40em',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const input: TargetInput = {
          round: res.round,
          player: res.player.id
        };

        this.addTargetSub = this.apolloSdk.createTarget(
          {
            data: input
          },
          {
            refetchQueries: [
              {
                query: TargetsDocument,
                variables: {
                  data: {
                    filterType: 'byCurrentUser'
                  }
                }
              }
            ]
          }
        )
          .subscribe(val => {
            this.snack.open(val.data.createTarget.success[0].message, 'Dismiss', { duration: 4000 });
          });
      });
  }

  ngOnDestroy() {
    if (this.addTargetSub) {
      this.addTargetSub.unsubscribe();
    }
  }
}
