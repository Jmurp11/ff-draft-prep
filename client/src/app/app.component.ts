import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Draft Shark';

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this._auth.autoLogin();
  }
}
