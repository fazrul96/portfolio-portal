import {Component, inject, Input, OnDestroy, OnInit, Signal} from '@angular/core';
import {DropzoneWrapperComponent} from "../dropzone-wrapper/dropzone-wrapper.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardModule, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {DialogIntroComponent} from '../dialog/dialog-intro/dialog-intro.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {UserService} from '../../../core/services/api/user.service';
import {Store} from '@ngxs/store';
import {FileState} from '../../../store/file/file.state';
import {Files, S3File} from '../../types/portal.type';
import {COMMON_CONSTANTS} from '../../constants/common.constants';
import {filter, Subject, switchMap, take, takeUntil} from 'rxjs';
import {formatFileSize} from '../../utils/file.utils';
import {PdfType} from '../../enums/pdf-type.enum';
import {S3_API} from '../../constants/api.constants';
import {PdfViewerData} from '../../../core/models/pdf-viewer-model';
import {DeleteResumeFile, GetPresignUrl} from '../../../store/file/file.action';
import Swal from 'sweetalert2';
import {DialogService} from '../../../core/services/dialog.service';

@Component({
  selector: 'app-card-sidenav-resume',
  imports: [
    DropzoneWrapperComponent,
    MatCard,
    MatCardSubtitle,
    MatIcon,
    MatTooltip,
    DropzoneModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
  ],
  templateUrl: './card-sidenav-resume.component.html',
  styleUrl: './card-sidenav-resume.component.scss'
})

export class CardSidenavResumeComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly userService: UserService = inject(UserService);
  private readonly unsubscribe$ = new Subject();

  @Input() type!: PdfType;

  resumeFiles: S3File[] = [];
  latestResume?: S3File;
  showAllActions: boolean = false;
  isAdmin: Signal<boolean> = this.userService.isAdmin;

  ngOnInit(): void {
    this.store
      .select(FileState.getResumes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fileData: Files): void => {
        const files: S3File[] = fileData?.files ?? [];
        this.setResumeFiles(files);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  toggleEditButton(): void {
    this.showAllActions = !this.showAllActions;
  }

  confirmDelete(file: S3File): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${file.name}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#9e9e9e',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new DeleteResumeFile(file.name));
        Swal.fire('Deleted!', `"${file.name}" has been deleted.`, 'success');
      }
    });
  }

  openDialog(type: PdfType, keyName?: string): void {
    const key: string | null = this.getFileKey(type, keyName);
    if (!key) return;

    this.store.dispatch(new GetPresignUrl(key)).pipe(
      switchMap(() => this.store.select(FileState.getPresignedUrl)),
      filter((url): url is string => !!url),
      take(1)
    ).subscribe((url: string): void => {
      const payload: PdfViewerData = { type, key, url };
      this.launchDialog(payload);
    });
  }

  private getFileKey(pdfType: PdfType, keyName?: string): string | null {
    if (pdfType === PdfType.CV) {
      const fileName: string | undefined = keyName ?? this.latestResume?.name;

      if (fileName) {
        return `${S3_API.PREFIXES.RESUME}${fileName}`;
      } else {
        console.warn('Missing resume file name for CV');
        return null;
      }
    }

    if (pdfType === PdfType.SNAPSYNCH) {
      return S3_API.PREFIXES.SNAPSYNCH;
    }

    console.warn('Invalid PDF type:', pdfType);
    return null;
  }

  private launchDialog(payload: PdfViewerData): void {
    const { width, height } = this.dialogService.getDialogSizeCardSideNavResume();

    const dialogRef = this.dialog.open(DialogIntroComponent, {
      width,
      height,
      maxWidth: '100vw',
      autoFocus: false,
      data: payload,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private setResumeFiles(files: S3File[]): void {
    if (files.length === 0) {
      this.latestResume = undefined;
      this.resumeFiles = [];
      return;
    }

    const [latest, ...rest] = files;
    this.latestResume = { ...latest, name: this.extractFileName(latest.name) };
    this.resumeFiles = rest.map((file: S3File) => ({
      ...file,
      name: this.extractFileName(file.name),
    }));
  }

  private extractFileName(fullPath: string): string {
    return fullPath.split(COMMON_CONSTANTS.SLASH).pop() ?? fullPath;
  }

  protected readonly formatFileSize = formatFileSize;
  protected readonly PdfType: typeof PdfType = PdfType;
}
