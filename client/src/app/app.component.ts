import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DraftShark';
  isAuth: boolean;

  constructor(
    private _auth: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  async ngOnInit() {
    this.store.select('user')
      .subscribe(data => this.isAuth = !!data.user);

    await this._auth.autoLogin();
  }
}
