import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesQueriesService } from '../notes-queries.service';
import { NotesMutationsService } from '../notes-mutations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserQueryService } from 'src/app/shared/user/user-query.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  note$: Subscription;
  user$: Subscription;
  like$: Subscription;
  delete$: Subscription;
  note: Note;
  userId: string;
  id: string;
  loading: boolean;
  likeCount: number;

  constructor(
    private route: ActivatedRoute,
    private _note: NoteService,
    private _noteQ: NotesQueriesService,
    private _noteM: NotesMutationsService,
    private _user: UserQueryService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];

        this.user$ = this._user.me()
          .subscribe(({ data }) => {
            this.userId = data.me.id;

            this.note$ = this._noteQ.note(this.id)
              .subscribe(({ data, loading }) => {
                this.note = data.note;
                this.loading = loading;

                this.likeCount = this.getCount(this.note.likes);
              });
          });

        this.like$ = this._note.likeStatus.subscribe(response => {
          if (response) {
            this.openSnackBar(response.message, 'Dismiss');
            this._note.resetResponse();
          }
        });

        this.delete$ = this._note.deleteStatus.subscribe(response => {
          if (response) {
            this.openSnackBar(response.message, 'Dismiss');
            this._note.resetResponse();
          }
        });

      });
  }

  getCount(arr: any) {
    let count = 0;
    arr.forEach(el => count++);
    return count;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  addComment(note: any) {
    console.log('Add comment');
  }

  deleteNote(note: any) {
    this._noteM.deleteNote(note.id, this.userId, note.player.id);
    this.router.navigate(['./dashboard']);
  }

  addLike(note: any) {
    this._noteM.addLike(this.userId, note.id);
  }

  createShare(note: any) {
    this._noteM.createShare(this.userId, note.id);
  }

  navigateToNote(note: string) {
    this.router.navigate([`./n/note/${note}`]);
  }

  navigateToProfile(username: string) {
    this.router.navigate([`./u/profile/${username}`]);
  }

  navigateToPlayer(player: string) {
    this.router.navigate([`./d/player/${player}`]);
  }

  ngOnDestroy() {
    if (this.note$) {
      this.note$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
  }
}
