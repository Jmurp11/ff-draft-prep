import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerGqlService } from '../player-gql.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../player.model';
import { Note } from '../../../notes/note.model';
import { NotesQueriesService } from '../../../notes/notes-queries.service';
import { User } from '../../../shared/user/user.model';
import { UserQueryService } from '../../../shared/user/user-query.service';
import { NoteService } from '../../../notes/note.service';
import { NoteDialogComponent } from '../../../notes/note-dialog/note-dialog.component';
import { TargetDialogComponent } from '../../../target/target-dialog/target-dialog.component';
import { TargetService } from 'src/app/target/target.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {
  playerNotes$: Subscription;
  userNotes$: Subscription;
  route$: Subscription;
  player$: Subscription;
  avgTarget$: Subscription;
  user$: Subscription;
  target$: Subscription;
  user: User;
  userId: string;
  id: string;
  player: Player;
  avgTargetRound: number;
  userTarget: number;
  loading: boolean;
  playerNotes: Note[];
  userNotes: Note[];
  playerLoading: boolean;
  userLoading: boolean;

  constructor(
    private _playerQ: PlayerGqlService,
    private _noteQ: NotesQueriesService,
    private _userQ: UserQueryService,
    private dialog: MatDialog,
    private _note: NoteService,
    private _target: TargetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userTarget = null;

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.user$ = this._userQ.me()
          .subscribe(({ data }) => {
            this.user = data.me;
            this.userId = this.user.id;

            this.player$ = this._playerQ.player(this.id)
              .subscribe(({ data, loading }) => {
                this.loading = loading;
                this.player = data.player;

                this.playerNotes$ = this._noteQ.notesByPlayer(this.id)
                  .subscribe(({ data, loading }) => {
                    this.playerLoading = loading;
                    this.playerNotes = data.notesByPlayer;
                  });
                this.userNotes$ = this._noteQ.notesByPlayerUser(this.id, this.user.id)
                  .subscribe(({ data, loading }) => {
                    this.userLoading = loading;
                    this.userNotes = data.notesByPlayerUser;
                  });
                this.target$ = this._target.targetByPlayerUser(this.user.id, this.id)
                  .subscribe(({ data }) => {
                    if (data.targetByPlayerUser) {
                      this.userTarget = data.targetByPlayerUser.round;
                    } else {
                      this.userTarget = null;
                    }
                  });
                this.avgTarget$ = this._playerQ.avgTargetRound(this.id)
                  .subscribe(({ data }) => {
                    this.avgTargetRound = data.avgTargetRound;
                  });
              });
          });
      });
  }

  divide(val1: number, val2: number) {
    return val1 / val2;
  }

  add(val: number[]) {
    let sum = 0;

    val.forEach(num => sum = sum + num);

    return sum;
  }

  addNote(): void {
    this._note.prepopulatePlayer(false);
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '850px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  addTarget() {
    const dialogRef = this.dialog.open(TargetDialogComponent, {
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnDestroy() {
    if (this.player$) {
      this.player$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.avgTarget$) {
      this.avgTarget$.unsubscribe();
    }
    if (this.playerNotes$) {
      this.playerNotes$.unsubscribe();
    }
    if (this.userNotes$) {
      this.userNotes$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
    if (this.target$) {
      this.target$.unsubscribe();
    }
  }
}
