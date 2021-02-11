import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthStoreService } from '../../auth/auth-store.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/user';
import { switchMap } from 'rxjs/operators';
import { MatchMediaService } from '../match-media.service';
import { UIStoreService } from '../ui-store.service';
import { NoteArgs } from '../../sdk/generated/graphql';
import { NoteStoreService } from '../../notes/note-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  subSink: Subscription;
  user: User;
  profileImage: string;
  appTitle: string = 'DraftShark';
  rightNavState: boolean = false;
  player: any;
  noteInput: NoteArgs;

  constructor(
    private authStore: AuthStoreService,
    private matchMedia: MatchMediaService,
    private noteStore: NoteStoreService,
    private uiStore: UIStoreService
  ) { }

  ngOnInit() {
    this.subSink = new Subscription();

    this.profileImage = null;

    this.subSink.add(
      this.authStore.stateChanged
        .pipe(
          switchMap(() => this.authStore.getCurrentUser())
        )
        .subscribe(currentUser => {
          this.user = currentUser;
          this.profileImage = this.user ? this.user.profileImage : null;
        })
    );

    this.subSink.add(
      this.noteStore.stateChanged
        .pipe(
          switchMap(() => this.noteStore.getNoteInput())
        )
        .subscribe(res => this.noteInput = res)
    );

    this.subSink.add(
      this.uiStore.stateChanged
        .pipe(
          switchMap(() => this.uiStore.getRightNavState())
        )
        .subscribe(res => {
          this.rightNavState = res;
        })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    return this.matchMedia.setWindowHeightValue(event.target.innerHeight);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
