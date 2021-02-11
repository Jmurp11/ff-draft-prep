import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK, Folder } from '../../sdk/generated/graphql';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, OnDestroy {
  subSink: Subscription;
  folders: any[];
  showLoadingSpinner: boolean;

  constructor(
    private apolloSdk: ApolloAngularSDK
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();

    this.showLoadingSpinner = true;

    this.subSink.add(
      this.apolloSdk.foldersWatch(
        {
          data: {
            filterType: 'byCurrentUser'
          }
        })
        .valueChanges
        .subscribe(({ loading, data }) => {
          this.showLoadingSpinner = loading;
          this.folders = data.folders
        })
    );
  }

  ngOnDestroy() {

  }
}
