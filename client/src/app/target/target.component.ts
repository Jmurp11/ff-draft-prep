import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Target } from './target.model';
import { targets } from './queries';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit, OnDestroy {
  targets$: Subscription;
  curUser$: Subscription;
  loading: boolean;
  hasTargets: boolean;
  targets: Target[];
  curUser: User;
  displayedColumns = ['name', 'team', 'position', 'round'];

  constructor(
    private _auth: AuthService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.loading = true;

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
        if (targets.length > 0) {
          this.hasTargets = true;
        } else {
          this.hasTargets = false;
        }
      });
  }

  deleteTarget(target: string) {

  }

  ngOnDestroy() {
    this.targets$.unsubscribe();
  }
}
