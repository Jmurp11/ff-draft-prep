import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerGqlService } from '../player-gql.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {

  route$: Subscription;
  player$: Subscription;
  id: string;
  player: any;
  loading: boolean;

  constructor(
    private _playerQ: PlayerGqlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.player$ = this._playerQ.player(this.id)
          .subscribe(({data, loading}) => {
            this.loading = loading;
            this.player = data.player;
          });
      });
  }

  ngOnDestroy() {
    if (this.player$) {
      this.player$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }
}
