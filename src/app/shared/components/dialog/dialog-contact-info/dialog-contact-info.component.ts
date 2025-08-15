import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-contact-info',
  imports: [
    MatDialogActions,
    MatIconButton,
    MatIcon,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './dialog-contact-info.component.html',
  styleUrl: './dialog-contact-info.component.scss'
})
export class DialogContactInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContactInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: 'Fazrul Romli',
      linkedin: 'https://linkedin.com/in/fazrul-romli-79138415b',
      phone: '0199508927',
      email: 'mfazrul07@gmail.com',
      birthday: 'May 16',
    }
  ) {}
}
