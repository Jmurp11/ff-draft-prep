import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { userByUsername } from '../queries';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  query$: Subscription;
  loading: boolean;
  user: {
    id: string;
    email: string;
    username: string;
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
      username: ''
    };
    this.route.params
      .subscribe((params: Params) => {
        this.username = params['username'];
        this.query$ = this.apollo.watchQuery<any>({
          query: userByUsername,
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
              username: data.userByUsername.username
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
    this.query$.unsubscribe();
  }
}