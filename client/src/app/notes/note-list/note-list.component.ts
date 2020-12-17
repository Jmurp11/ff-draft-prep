import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ApolloAngularSDK, NoteArgs } from 'src/app/sdk/generated/graphql';
import { switchMap, map, tap } from 'rxjs/operators';
import { NavStoreService } from 'src/app/ui/nav-store.service';
import { PlayerStoreService } from 'src/app/players/player-store.service';

enum TypeOption {
  PUBLIC = 'Public',
  USER = 'user'
}
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  form: FormGroup;
  displayData$: Observable<any[]>;
  // batchSize: number;
  // theEnd: boolean;
  // offset = new BehaviorSubject(null);
  typeOptions: string[];
  showFilter: boolean;
  currentRoute: string;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private navStore: NavStoreService,
    private playerStore: PlayerStoreService
  ) { }

  ngOnInit(): void {
    this.typeOptions = [
      TypeOption.PUBLIC,
      TypeOption.USER
    ];

    this.form = new FormGroup({
      noteType: new FormControl(null, {
        updateOn: 'change'
      }),
    });

    this.displayData$ = this.navStore.stateChanged
      .pipe(
        tap(state => this.showFilter = (!state.currentRoute.includes('landing')) ? true : false),
        switchMap(() => {
          return this.playerStore.stateChanged;
        }),
        switchMap(output2 => {
          let input: NoteArgs = {
            filterType: null
          };

          // Think of a configuration service for this rather than if / else

          if (output2.currentRoute) {
            if (!output2.currentRoute.includes('landing') && !output2.currentRoute.includes('players')) {
              input = {
                filterType: null
              };
            } else if (output2.currentRoute.includes('landing')) {
              input = {
                filterType: null
              };
            } else if (output2.currentRoute.includes('players')) {
              input = {
                filterType: 'byPlayer',
                player: output2.currentPlayer
              };
            }
            return this.apolloSdk.notesWatch({ data: input })
              .valueChanges;
          }
        })
      ).pipe(
        map(vals => vals.data.notes)
      );
  }
}
