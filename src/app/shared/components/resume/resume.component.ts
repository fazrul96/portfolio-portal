import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
import {ZoomService} from '../../../core/services/zoom.service';
import {MatTooltip} from '@angular/material/tooltip';
import {PdfType} from '../../enums/pdf-type.enum';

@Component({
  selector: 'app-resume',
  imports: [
    MatButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnChanges {
  @Input() type!: PdfType;
  currentFile: string = '';
  private readonly zoomService: ZoomService = inject(ZoomService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.updateFile();
    }
  }

  updateFile(): void {
    this.currentFile = this.type === PdfType.CV ? 'assets/pdfs/cv.pdf' : 'assets/pdfs/snapsynch.pdf';
  }

  downloadResume(): void {
    const file =
      this.type === PdfType.CV ? 'assets/images/profile/pdf/cv.pdf'
        : 'assets/images/profile/pdf/snapSynch.pdf';

    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() ?? 'resume.pdf';
    link.click();
  }

  zoomIn(): void {
    this.zoomService.zoomIn();
  }

  zoomOut(): void {
    this.zoomService.zoomOut();
  }

  protected readonly PdfType: typeof PdfType = PdfType;
}
