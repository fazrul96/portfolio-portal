import {Component, computed, inject, Inject, Signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {UserState} from '../../../../store/user/user.state';
import {User} from '@auth0/auth0-angular';
import {environment} from '../../../../../environments/environment';
import {Store} from '@ngxs/store';
import {DeleteExperience, PostExperience} from '../../../../store/experience/experience.action';
import {timer} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-experience-details',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIconButton,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './dialog-experience-details.component.html',
  styleUrl: './dialog-experience-details.component.scss'
})
export class DialogExperienceDetailsComponent {
  private readonly store: Store = inject(Store);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<DialogExperienceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  readonly isLoggedIn: Signal<boolean> = this.store.selectSignal(UserState.isLoggedIn);
  readonly userDetailsSignal: Signal<User> = this.store.selectSignal(UserState.getUser);
  readonly isAdmin: Signal<boolean> = computed((): boolean => {
    const user: User = this.userDetailsSignal();
    return this.isLoggedIn() && user?.email === environment.user?.email;
  });

  deleteExperience(): void {
    if (!this.data?.id) {
      console.error('No experience ID found!');
      return;
    }

    this.store.dispatch(new DeleteExperience(this.data.id)).subscribe({
      complete: (): void => {
        this.snackBar.open('Experience deleted successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close({ deleted: true, id: this.data.id });
      },
      error: (err: any): void => {
        this.snackBar.open(err?.message ?? 'Failed to delete experience.', 'Close', { duration: 4000 });
      }
    });
  }
}
