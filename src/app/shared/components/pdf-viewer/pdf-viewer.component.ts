import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {Subscription} from 'rxjs';
import {ZoomService} from '../../../core/services/zoom.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  imports: [PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent implements OnInit, OnDestroy {
  private readonly zoomService: ZoomService = inject(ZoomService);
  private zoomSub!: Subscription;

  @Input() url!: string;

  pdfSrc!: SafeResourceUrl;
  zoom: number = 1.0;

  ngOnInit(): void {
    this.zoomSub = this.zoomService.zoom$.subscribe((zoom: number): void => {
      this.zoom = zoom;
    });
    if (this.url) {
      this.pdfSrc = this.url;
    }
  }

  ngOnDestroy(): void {
    this.zoomSub?.unsubscribe();
  }
}
