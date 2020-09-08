import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApolloAngularSDK, TargetArgs, TargetsDocument, Exact, DeleteTargetArgs } from '../../sdk/generated/graphql';
import { Subscription } from 'rxjs';
import { User } from '../../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TargetsQueryService } from '../targets-query.service';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.scss']
})
export class TargetTableComponent implements OnInit, OnDestroy {

  data: any[];
  displayedColumns: string[];
  dataSub: Subscription;
  currentUser: Pick<User, null>;
  deleteTargetSub: Subscription;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private snack: MatSnackBar,
    private target: TargetsQueryService,
    private authStore: AuthStoreService
  ) {
    this.data = [];
    this.displayedColumns = [
      'round',
      'name',
      'position',
      'team',
      'action'
    ];
  }

  ngOnInit(): void {
    this.dataSub = this.authStore.stateChanged
      .pipe(
        switchMap(output => {
          if (output.currentUser) {
            return this.target.getTargets()
          }
        })
      ).subscribe(res => this.data = res.data.targets);
  }

  removeTarget(id: string) {
    const input: DeleteTargetArgs = {
      id
    };

    this.deleteTargetSub = this.apolloSdk.deleteTarget(
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
      .subscribe(res => {
        this.snack.open(res.data.deleteTarget.success[0].message, 'Dismiss', { duration: 4000 });
      });
  }

  ngOnDestroy() {
    if (this.deleteTargetSub) {
      this.deleteTargetSub.unsubscribe();
    }
    this.dataSub.unsubscribe();
  }
}
