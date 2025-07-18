import {Component, inject, Input, OnDestroy, OnInit, Signal} from '@angular/core';
import {DropzoneWrapperComponent} from "../dropzone-wrapper/dropzone-wrapper.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
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
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {PdfType} from '../../enums/pdf-type.enum';
import {S3_API} from '../../constants/api.constants';
import {PdfViewerData} from '../../../core/models/pdf-viewer-model';
import {GetPresignUrl} from '../../../store/file/file.action';

@Component({
  selector: 'app-card-sidenav-resume',
  imports: [
    DropzoneWrapperComponent,
    MatButton,
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
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private readonly userService: UserService = inject(UserService);
  private readonly unsubscribe$ = new Subject();

  @Input() type!: PdfType;

  resumeFiles: S3File[] = [];
  latestResume?: S3File;
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

  openDialog(type: PdfType): void {
    const key: string | null = this.getFileKey(type);
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

  private getFileKey(pdfType: PdfType): string | null {
    if (pdfType === PdfType.CV && this.latestResume) {
      return `${S3_API.PREFIXES.RESUME}${this.latestResume.name}`;
    } else if (pdfType === PdfType.SNAPSYNCH) {
      return S3_API.PREFIXES.SNAPSYNCH;
    }
    return null;
  }

  private launchDialog(payload: PdfViewerData): void {
    const { width, height } = this.getDialogSize();

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

  private getDialogSize(): { width: string; height: string } {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return {
        width: '100vw',
        height: '75vh'
      };
    } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      return {
        width: '35vw',
        height: '80vh'
      };
    }
    return {
      width: '50vw',
      height: '90vh'
    };
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
