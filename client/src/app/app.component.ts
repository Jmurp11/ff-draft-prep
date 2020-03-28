import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DraftShark';
  isAuth: boolean;

  constructor(
    private _auth: AuthService
  ) { }

  async ngOnInit() {
    this._auth.user.subscribe(user => {
      this.isAuth = !!user;
    });

    await this._auth.autoLogin();
  }
}
