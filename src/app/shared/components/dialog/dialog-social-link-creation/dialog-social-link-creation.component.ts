import {Component, inject, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-social-link-creation',
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './dialog-social-link-creation.component.html',
  styleUrl: './dialog-social-link-creation.component.scss'
})
export class DialogSocialLinkCreationComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<DialogSocialLinkCreationComponent> = inject(MatDialogRef);

  socialLinkForm!: FormGroup;

  ngOnInit(): void {
    this.socialLinkForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      icon: ['']
    });
  }

  onSubmit(): void {
    if (this.socialLinkForm.valid) {
      this.dialogRef.close(this.socialLinkForm.value);
    }
  }
}
