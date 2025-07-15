import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
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
import {Subject} from 'rxjs';
import {formatFileSize} from '../../utils/file.utils';

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
  readonly dialog: MatDialog = inject(MatDialog);
  readonly userService: UserService = inject(UserService);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  private readonly unsubscribe$ = new Subject();

  resumeFiles: S3File[] = [];
  latestResume?: S3File;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogIntroComponent, {
      width: '50vw',
      height: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private extractFileName(fullPath: string): string {
    return fullPath.split(COMMON_CONSTANTS.SLASH).pop() ?? fullPath;
  }

  ngOnInit(): void {
    this.store.select(FileState.getResumes).subscribe((fileData: Files | undefined) => {
      const files = fileData?.files ?? [];

      if (files.length > 0) {
        this.latestResume = {
          ...files[0],
          name: this.extractFileName(files[0].name),
        };

        this.resumeFiles = files.slice(1).map(file => ({
          ...file,
          name: this.extractFileName(file.name),
        }));
      } else {
        this.latestResume = undefined;
        this.resumeFiles = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  protected readonly formatFileSize = formatFileSize;
}
