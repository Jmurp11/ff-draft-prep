import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ApolloAngularSDK, NoteArgs } from 'src/app/sdk/generated/graphql';
import { switchMap, map, tap } from 'rxjs/operators';
import { NavStoreService } from 'src/app/ui/nav-store.service';
import { PlayerStoreService } from 'src/app/players/player-store.service';

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
  ) {
    this.typeOptions = [
      'Public',
      'User'
    ];
  }

  ngOnInit(): void {

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

          if (output2.currentRoute) {
            if (!output2.currentRoute.includes('landing') && !output2.currentRoute.includes('players')) {
              input = {
                filterType: null // will be current user
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
  /**
constructor(
private apolloSdk: ApolloAngularSDK
) {
// this.batchSize = 10;
this.typeOptions = [
'Public',
'User'
];
}

ngOnInit(): void {

this.form = new FormGroup({
noteType: new FormControl(null, {
updateOn: 'change'
}),
});

const batchMap = this.offset.pipe(
throttleTime(500),
mergeMap(n => this.getBatch(n)),
scan((acc, batch) => {
return { ...acc, ...batch };
}, {})
);

this.displayData$ = batchMap.pipe(map(vals => Object.values(vals)));

}

getNextBatch(e: any, offset: number) {
if (this.theEnd) {
return;
}

const end = this.viewport.getRenderedRange().end;
const total = this.viewport.getDataLength();

if (end === total) {
this.offset.next(offset);
}
}

getBatch(offset: number) {
const notesInput: PlayerArgs = {
filterType: null,
take: this.batchSize,
skip: offset
};

return this.apolloSdk.notesWatch({
data: notesInput
})
.valueChanges
.pipe(
tap(arr => (arr.data.notes.length ? null : (this.theEnd = true))),
map(arr => arr.data.notes, {})
);
}
*/
