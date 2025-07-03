import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-dialog-automation-details',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    NgStyle
  ],
  templateUrl: './dialog-automation-details.component.html',
  styleUrl: './dialog-automation-details.component.scss'
})
export class DialogAutomationDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAutomationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public project: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
