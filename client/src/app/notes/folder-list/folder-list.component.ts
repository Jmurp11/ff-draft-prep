import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NavigateService } from '../../shared/navigate.service';
import { ApolloAngularSDK, DeleteNoteInput, Exact, Folder, FolderArgs, FoldersDocument, Note, NotesDocument } from '../../sdk/generated/graphql';
import { NoteStoreService } from '../note-store.service';
import { UIStoreService } from '../../ui/ui-store.service';
import { PopUpService } from 'src/app/shared/pop-up.service';

interface FlatNode {
  expandable: boolean;
  title: string;
  id: string;
  updatedTime: string;
  level: number;
}

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, OnDestroy {
  subSink: Subscription;
  notes: Pick<Note, "id" | "title" | "updatedTime" >[];
  showLoadingSpinner: boolean;
  isFolder: boolean = true;

  private _transformer = (node: Pick<Folder, "id" | "title" | "updatedTime"> & { notes?: Pick<Note, "id" | "title" | "updatedTime" >[] }, level: number) => {
    return {
      expandable: !!node.notes && node.notes.length > 0,
      id: node.id,
      title: node.title,
      updatedTime: node.updatedTime,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.notes);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(
    private noteStore: NoteStoreService,
    private uiStore: UIStoreService,
    private apolloSdk: ApolloAngularSDK,
    public _navigate: NavigateService,
    private snack: MatSnackBar,
    public _popupService: PopUpService
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
          this.dataSource.data = data.folders;
        })
    );

    this.subSink.add(
      this.apolloSdk.notesWatch(
        {
          data: {
            filterType: 'byCurrentUserAndNoFolder'
          }
        })
        .valueChanges
        .subscribe(({ loading, data }) => {
          this.showLoadingSpinner = loading;
          this.notes = data.notes;
        })
    );
  }

  setNoteQueryInput(isFolder: boolean, id: string) {

    const folderInput = {
      filterType: 'byFolder',
      folder: id
    };

    const noteInput = {
      filterType: 'byId',
      id
    };

    const input = isFolder ? folderInput : noteInput;

    this.noteStore.updateNoteInput(input);
  }

  openNoteList(isFolder: boolean, id: string) {
    this.setNoteQueryInput(isFolder, id);
    this.uiStore.updateRightNavState(true);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  deleteNote(id: string) {

    const input: Exact<DeleteNoteInput> = {
      id
    };

    this.subSink.add(
      this.apolloSdk.deleteNote({
        data: input
      }, {
        refetchQueries: [
          {
            query: NotesDocument,
            variables: {
              data: {
                filterType: 'byCurrentUserAndNoFolder'
              }
            }
          },
          {
            query: FoldersDocument,
            variables: {
              data: {
                filterType: 'byCurrentUser'
              }
            }
          }
        ]
      })
        .subscribe(({ data }) => {
          if (data.deleteNote.success) {
            this.snack.open(data.deleteNote.success[0].message, 'Dismiss', { duration: 5000 });
          }

          if (data.deleteNote.errors) {
            this.snack.open(data.deleteNote.errors[0].message, 'Dismiss', { duration: 5000 });
          }
        })
    );
  }

  deleteFolder(id: string) {
    const input: Exact<FolderArgs> = {
      id
    };

    this.subSink.add(
      this.apolloSdk.deleteFolder({
        data: input
      }, {
        refetchQueries: [
          {
            query: FoldersDocument,
            variables: {
              data: {
                filterType: 'byCurrentUser'
              }
            }
          }
        ]
      }).subscribe(({ data }) => {
        if (data.deleteFolder.success) {
          this.snack.open(data.deleteFolder.success[0].message, 'Dismiss', { duration: 5000 });
        }

        if (data.deleteFolder.errors) {
          this.snack.open(data.deleteFolder.errors[0].message, 'Dismiss', { duration: 5000 });
        }
      })
    );

  }

  deleteItem(level: number, id: string) {
    if (level === 0) {
      this.deleteFolder(id);
    } else {
      this.deleteNote(id,);
    }
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
