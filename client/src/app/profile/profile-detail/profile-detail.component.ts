import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { user } from '../../shared/user/queries';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { UserQueryService } from 'src/app/shared/user/user-query.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  user$: Subscription;
  route$: Subscription;
  loading: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    profileImage: string;
  };
  username: string;

  constructor(
    private _userQ: UserQueryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = '';
    this.user = {
      id: '',
      email: '',
      username: '',
      profileImage: ''
    };
    this.route$ = this.route.params
      .subscribe((params: Params) => {
        this.username = params['username'];
        this.user$ = this._userQ.user(this.username)
          .subscribe(({ data, loading }) => {
            this.loading = loading;
            this.user = {
              id: data.userByUsername.id,
              email: data.userByUsername.email,
              username: data.userByUsername.username,
              profileImage: data.userByUsername.profileImage
            };
            if (!this.user) {
              this.router.navigate(['dashboard']);
            }
          });
      });
  }

  navigateToEdit() {
    return this.router.navigate([`edit`], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.user$) {
      return this.user$.unsubscribe();
    }
    if (this.route$) {
      return this.route$.unsubscribe();
    }
  }
}
