import { Component, OnInit, OnDestroy } from '@angular/core';
import { DraftStateService } from '../player-table/draft-state.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOption: string;
  isDraft: Boolean;
  _draftSubscription: Subscription;

  constructor(private draftState: DraftStateService) { }

  ngOnInit() {
    this.menuOption = 'Draft';
    this._draftSubscription = this.draftState.isDraft.subscribe(data => {
      this.isDraft = data;
    });
  }

  updateDraftState() {
    this.draftState.updateIsDraft();
    this.updateMenuOption();
  }

  updateMenuOption() {
    if (this.draftState.isDraft.getValue()) {
      this.menuOption = 'Draft Prep';
    } else {
      this.menuOption = 'Draft';
    }
  }

  ngOnDestroy() {
    this._draftSubscription.unsubscribe();
  }
}
