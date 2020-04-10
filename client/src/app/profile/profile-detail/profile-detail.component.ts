import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { user } from '../../shared/user/queries';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  query$: Subscription;
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
    private apollo: Apollo,
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
        this.query$ = this.apollo.watchQuery<any>({
          query: user,
          variables: {
            username: this.username
          }
        })
          .valueChanges
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
    this.router.navigate([`edit`], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.query$) {
      this.query$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }
}
