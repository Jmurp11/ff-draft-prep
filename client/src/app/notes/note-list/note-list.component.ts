import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from '../../shared/loading-spinner/loading.service';
import { ApolloAngularSDK, NoteArgs } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  notesInput: NoteArgs;

  subSink: Subscription = new Subscription();
  notes$: Observable<any[]>;
  showLoadingSpinner$: Observable<boolean>;
  player: number;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.showLoadingSpinner$ = this.loadingService.isLoading;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'notesInput': {
            const input = this.notesInput;
            this.subSink.add(
              this.apolloSdk.notesWatch({ data: input })
                .valueChanges
                .subscribe(({ data, loading }) => {
                  this.loadingService.isLoading.next(loading);
                  this.notes$ = of(data.notes)
                })
            );
            break;
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
