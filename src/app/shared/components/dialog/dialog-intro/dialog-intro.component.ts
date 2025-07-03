import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ResumeComponent} from '../../resume/resume.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {PdfViewerComponent} from '../../pdf-viewer/pdf-viewer.component';
import {PdfType} from '../../../enums/pdf-type.enum';

@Component({
  selector: 'app-dialog-intro',
  imports: [MatDialogModule, MatButtonModule, MatTabGroup, MatTab, ResumeComponent, PdfViewerModule, PdfViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-intro.component.html',
  styleUrl: './dialog-intro.component.scss'
})

export class DialogIntroComponent {
  protected readonly PdfType: typeof PdfType = PdfType;
  currentPdfType: PdfType = PdfType.CV;

  onTabChange(index: number): void {
    this.currentPdfType = index === 0 ? PdfType.CV : PdfType.SNAPSYNCH;
  }
}
