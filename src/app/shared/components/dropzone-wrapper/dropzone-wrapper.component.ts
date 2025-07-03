import {Component} from '@angular/core';
import {DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-dropzone-wrapper',
  imports: [
    DropzoneModule,
  ],
  templateUrl: './dropzone-wrapper.component.html',
  styleUrl: './dropzone-wrapper.component.scss'
})
export class DropzoneWrapperComponent {
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
}
