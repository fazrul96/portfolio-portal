import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DialogData} from '../../../data/project.data';

@Component({
  selector: 'app-dialog-access',
  imports: [
    MatDialogClose,
    MatButton,
    MatIcon
  ],
  templateUrl: './dialog-access.component.html',
  styleUrl: './dialog-access.component.scss'
})
export class DialogAccessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
