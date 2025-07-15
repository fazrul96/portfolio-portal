import {Component, inject, Inject, Signal} from '@angular/core';
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
import {Store} from '@ngxs/store';
import {DeleteExperience} from '../../../../store/experience/experience.action';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../../core/services/api/user.service';

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

  readonly userService: UserService = inject(UserService);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

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
