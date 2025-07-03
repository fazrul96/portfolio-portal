import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {Subscription} from 'rxjs';
import {ZoomService} from '../../../core/services/zoom.service';
import {PdfType} from '../../enums/pdf-type.enum';

@Component({
  selector: 'app-pdf-viewer',
  imports: [
    PdfViewerModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent implements OnInit, OnDestroy {
  @Input() type!: PdfType;
  pdfSrc!: string;
  zoom:number = 1.0;
  private zoomSub!: Subscription;

  private readonly zoomService: ZoomService = inject(ZoomService);

  setPdfSrc(): void {
    switch (this.type) {
      case PdfType.CV:
        this.pdfSrc = 'assets/images/profile/pdf/cv.pdf';
        break;
      case PdfType.SNAPSYNCH:
        this.pdfSrc = 'assets/images/profile/pdf/snapSynch.pdf';
        break;
      default:
        this.pdfSrc = '';
    }
  }

  ngOnInit(): void {
    this.zoomSub = this.zoomService.zoom$.subscribe((zoom: number): void => {
      this.zoom = zoom;
    });
    this.setPdfSrc();
  }

  ngOnDestroy(): void {
    this.zoomSub?.unsubscribe();
  }
}
