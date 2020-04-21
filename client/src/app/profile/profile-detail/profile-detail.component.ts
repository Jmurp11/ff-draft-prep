import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserQueryService } from 'src/app/shared/user/user-query.service';
import { NotesQueriesService } from 'src/app/notes/notes-queries.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user$: Subscription;
  curUser$: Subscription;
  route$: Subscription;
  notes$: Subscription;
  notesCount$: Subscription;
  likesCount$: Subscription;
  likesGenCount$: Subscription;
  updateStatus$: Subscription;

  notesCount: number;
  likesCount: number;
  likesGenCount: number;
  loading: boolean;
  isEdit: boolean;
  isValidImage: boolean;

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
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    const pattern = '(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif))';
    this.notes = [];
    this.isEdit = false;
    this.isValidImage = true;

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

        this.form = new FormGroup({
          profileImage: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.pattern(pattern)]
          })
        });

        this.form.get('profileImage').statusChanges.subscribe(status => {
          this.isValidImage = status === 'VALID';
        });

        this.updateStatus$ = this._userQ.updateUserStatus
          .subscribe(response => {
            if (response) {
              this.openSnackBar(response.message, 'Dismiss');
              this._userQ.updateUserStatus.next(null);
            }
          });

      });
  }

  onEdit() {
    this.form.reset();
    return this.isEdit = !this.isEdit;
  }

  onEditSubmit() {
    const image = this.form.get('profileImage').value;
    console.log(image);
    this.onEdit();
    this._userQ.updateUserProfileImage(this.user.id, image);
  }

  onCancel() {
    this.isValidImage = true;
    this.onEdit();
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
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
    if (this.updateStatus$) {
      return this.updateStatus$.unsubscribe();
    }
  }
}
