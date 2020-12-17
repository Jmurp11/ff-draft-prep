import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/user';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    private authStore: AuthStoreService
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
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
