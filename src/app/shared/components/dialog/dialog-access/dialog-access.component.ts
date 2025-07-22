import {Component} from '@angular/core';
import {MatDialogClose} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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

}
