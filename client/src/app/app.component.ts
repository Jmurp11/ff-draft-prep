import { Component, OnInit } from '@angular/core';
import { DraftStateService } from './player-table/draft-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Draft Shark';

  constructor(private _draftState: DraftStateService) { }

  ngOnInit() {
    this._draftState.setInitialState();
  }
}
