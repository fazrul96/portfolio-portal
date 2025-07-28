import {ChangeDetectionStrategy, Component, Inject, inject, OnDestroy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {PdfViewerComponent} from '../../pdf-viewer/pdf-viewer.component';
import {PdfType} from '../../../enums/pdf-type.enum';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {ZoomService} from '../../../../core/services/zoom.service';
import {Store} from '@ngxs/store';
import {DownloadItem} from '../../../../store/file/file.action';
import {Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../../constants/common.constants';
import {PdfViewerData} from '../../../../core/models/pdf-viewer-model';
import {DownloadableItem} from '../../../types/portal.type';

@Component({
  selector: 'app-dialog-intro',
  imports: [
    MatDialogModule, MatButtonModule, PdfViewerModule, PdfViewerComponent, MatIcon, MatTooltip
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-intro.component.html',
  styleUrl: './dialog-intro.component.scss'
})

export class DialogIntroComponent implements OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly zoomService: ZoomService = inject(ZoomService);
  private readonly unsubscribe$ = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public data: PdfViewerData) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  zoomIn(): void {
    this.zoomService.zoomIn();
  }

  zoomOut(): void {
    this.zoomService.zoomOut();
  }

  download(): void {
    if (this.data.key) {
      const item: DownloadableItem = {
        name: this.data.key,
        type: 'file'
      };

      this.store.dispatch(new DownloadItem(item))
        .pipe(takeUntil(this.unsubscribe$)).subscribe();
    }
  }

  get dialogTitle(): string {
    switch (this.data.type) {
      case PdfType.CV:
        return 'Resume / CV Profile';
      case PdfType.SNAPSYNCH:
        return 'SnapSynch Profile';
      default:
        return 'PDF Viewer';
    }
  }
}
