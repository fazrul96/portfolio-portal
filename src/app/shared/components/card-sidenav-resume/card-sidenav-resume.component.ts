import {Component, computed, inject, Signal} from '@angular/core';
import {DropzoneWrapperComponent} from "../dropzone-wrapper/dropzone-wrapper.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardModule, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {DialogIntroComponent} from '../dialog/dialog-intro/dialog-intro.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {UserState} from '../../../store/user/user.state';
import {User} from '@auth0/auth0-angular';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-card-sidenav-resume',
  imports: [
    DropzoneWrapperComponent,
    MatButton,
    MatCard,
    MatCardSubtitle,
    MatIcon,
    MatTooltip,
    DropzoneModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
  ],
  templateUrl: './card-sidenav-resume.component.html',
  styleUrl: './card-sidenav-resume.component.scss'
})
export class CardSidenavResumeComponent {
  private readonly store: Store = inject(Store);
  readonly dialog: MatDialog = inject(MatDialog);

  readonly isLoggedIn: Signal<boolean> = this.store.selectSignal(UserState.isLoggedIn);
  readonly userDetailsSignal: Signal<User> = this.store.selectSignal(UserState.getUser);
  readonly isAdmin: Signal<boolean> = computed((): boolean => {
    const user: User = this.userDetailsSignal();
    return this.isLoggedIn() && user?.email === environment.user?.email;
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogIntroComponent, {
      width: '50vw',
      height: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
