import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApolloAngularSDK, UserArgs } from 'src/app/sdk/generated/graphql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[];
  data: any;
  dataSub: Subscription;

  constructor(
    private apolloSdk: ApolloAngularSDK
  ) {
    this.displayedColumns = [
      'username',
      'email',
      'forgotPasswordLock',
      'isLoggedIn',
      'creationTime',
      'lastLoggedIn',
      'isAdmin'
    ];
  }

  ngOnInit(): void {
    const input: UserArgs = {
      filterType: null
    };

    this.dataSub = this.apolloSdk.adminUsersWatch({ data: input })
      .valueChanges
      .subscribe(res => this.data = res.data.users);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
