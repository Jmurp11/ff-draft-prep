import { Component, OnInit, OnDestroy, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { AuthStoreService } from '../../auth/auth-store.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../../auth/login/login.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from '../../auth/register/register.component';
import { ApolloAngularSDK, RegisterInput, User } from '../../sdk/generated/graphql';
import { NavigateService } from '../../shared/navigate.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input()
  currentUser: User;

  @Input()
  title: string;

  @Output()
  public sidenavToggle = new EventEmitter;

  subSink: Subscription;
  user: User;

  constructor(
    private authStore: AuthStoreService,
    private apolloSdk: ApolloAngularSDK,
    public _navigate: NavigateService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'currentUser': {
            this.user = this.currentUser;
            break;
          }
        }
      }
    }
  }

  openLoginDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(LoginComponent, {
      width: '40em',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        this.subSink.add(this.authStore.login(
          res.email,
          res.password
        ).subscribe(val => {
          if (val.data.login.success) {
            this.snack.open(`Welcome back ${val.data.login.success.user.username.toUpperCase()}!`, 'Dismiss', { duration: 4000 });
            this._navigate.navigate('dashboard');
          } else {
            this.snack.open(`${val.data.login.errors.message}`, 'Dismiss', { duration: 4000 });
          }
        }));
      });
  }

  openRegisterDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(RegisterComponent, {
      width: '40em',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const registerInput: RegisterInput = {
          email: res.email,
          username: res.username,
          password: res.password
        };

        this.subSink.add(this.apolloSdk.register({
          data: registerInput
        }).subscribe(val => {
          if (val.data.register.success) {
            this.snack.open(`${val.data.register.success[0].message}!`, 'Dismiss', { duration: 4000 });
          } else {
            this.snack.open(`${val.data.register.errors[0].message}`, 'Dismiss', { duration: 4000 });
          }
        }));
      });
  }

  signOut(): void {
    this.authStore.logout();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
