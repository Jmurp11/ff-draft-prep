import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserQueryService } from 'src/app/shared/user/user-query.service';
import { NotesQueriesService } from 'src/app/notes/notes-queries.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  user$: Subscription;
  curUser$: Subscription;
  route$: Subscription;
  notes$: Subscription;
  notesCount$: Subscription;
  likesCount$: Subscription;
  likesGenCount$: Subscription;
  notesCount: number;
  likesCount: number;
  likesGenCount: number;
  loading: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    profileImage: string;
    creationTime: Date;
  };
  username: string;
  isCurrentUser: boolean;
  notes: any;

  constructor(
    private _userQ: UserQueryService,
    private _notesQ: NotesQueriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.notes = [];

    this.username = '';
    this.user = {
      id: '',
      email: '',
      username: '',
      profileImage: '',
      creationTime: null
    };
    this.route$ = this.route.params
      .subscribe((params: Params) => {
        this.username = params['username'];
        this.user$ = this._userQ.user(this.username)
          .subscribe(({ data }) => {
            this.user = {
              id: data.userByUsername.id,
              email: data.userByUsername.email,
              username: data.userByUsername.username,
              profileImage: data.userByUsername.profileImage,
              creationTime: data.userByUsername.creationTime
            };
            this.curUser$ = this._userQ.me()
              .subscribe(({ data }) => {
                if (this.user.username === data.me.username) {
                  this.isCurrentUser = true;
                } else {
                  this.isCurrentUser = false;
                }

                this.notes$ = this._notesQ.userNotes(this.user.id, this.isCurrentUser)
                  .subscribe(({ data, loading }) => {
                    this.loading = loading;
                    this.notes = data.notes;
                  });

                this.notesCount$ = this._notesQ.noteCount(this.user.id)
                  .subscribe(({ data }) => {
                    this.notesCount = data.noteCount;
                  });

                this.likesCount$ = this._notesQ.userLikesCount(this.user.id)
                  .subscribe(({ data }) => {
                    this.likesCount = data.userLikesCount;
                  });

                this.likesGenCount$ = this._notesQ.userGeneratedLikesCount(this.user.id)
                  .subscribe(({ data }) => {
                    this.likesGenCount = data.userGeneratedLikesCount;
                  });
              });
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
    if (this.curUser$) {
      return this.curUser$.unsubscribe();
    }
    if (this.notes$) {
      return this.notes$.unsubscribe();
    }
    if (this.notesCount$) {
      return this.notesCount$.unsubscribe();
    }
    if (this.likesCount$) {
      return this.likesCount$.unsubscribe();
    }
    if (this.likesGenCount$) {
      return this.likesGenCount$.unsubscribe();
    }
    if (this.route$) {
      return this.route$.unsubscribe();
    }
  }
}
