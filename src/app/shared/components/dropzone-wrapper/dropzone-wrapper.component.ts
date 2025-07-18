import {Component, inject, Input} from '@angular/core';
import {DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {Store} from '@ngxs/store';
import {UploadResumeFile} from '../../../store/file/file.action';

@Component({
  selector: 'app-dropzone-wrapper',
  imports: [DropzoneModule,],
  templateUrl: './dropzone-wrapper.component.html',
  styleUrl: './dropzone-wrapper.component.scss'
})
export class DropzoneWrapperComponent {
  private readonly store: Store = inject(Store);
  @Input() disabled: boolean = false;

  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    acceptedFiles: 'application/pdf',
    autoReset: 5000,
    errorReset: 5000,
    cancelReset: 5000,
  };

  onUploadInit(args: any): void {
    console.log('[Dropzone] Upload init:', args);
  }

  onFileAdded(file: File): void {
    console.log('[Dropzone] File added:', file);

    if (file && file.type === 'application/pdf') {
      this.store.dispatch(new UploadResumeFile([file]));
    } else {
      console.warn('Rejected file type:', file?.type);
    }
  }

  onUploadError(args: any): void {
    if (Array.isArray(args)) {
      const [file, errorMessage] = args;
      console.warn('[Dropzone] Rejected file:', file?.upload?.filename);
      console.warn('[Dropzone] Reason:', errorMessage);
    }
  }

  onUploadSuccess(file: File): void {
    console.log('[Dropzone] Upload success:', file);
  }
}
