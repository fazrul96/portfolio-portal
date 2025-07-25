import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {STORAGE_PROVIDERS_DATA} from '../../shared/data/project.data';
import {Store} from '@ngxs/store';
import {map, Subject} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {LoadPortfolioFiles} from '../../store/file/file.action';
import {FileState} from '../../store/file/file.state';
import {AsyncPipe} from '@angular/common';
import {MatFormField, MatInput, MatPrefix} from '@angular/material/input';
import {extractFolderNameFromPath, formatFileSize} from '../../shared/utils/file.utils';
import {formatCamelCase} from '../../shared/utils/string.utils';
import {MatTooltip} from '@angular/material/tooltip';
import {formatDisplayDate} from '../../shared/utils/date.utils';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-storage',
  imports: [
    MatTabGroup,
    MatTab,
    MatIcon,
    MatProgressBar,
    AsyncPipe,
    MatFormField,
    MatPrefix,
    MatInput,
    MatIconButton,
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  readonly s3FolderList$ = this.store.select(FileState.getPortfolioFolders).pipe(
    map(folders =>
      folders.map(path => extractFolderNameFromPath(path))
    )
  );

  readonly s3FileList$ = this.store.select(FileState.getPortfolioFiles);
  readonly currentTabIndex = signal(0);
  readonly isUploading = signal(false);
  public dragging = false;

  public viewMode: 'grid' | 'list' = 'list';
  breadcrumbs: string[] = [];
  currentPath: string = COMMON_CONSTANTS.EMPTY_STRING;

  ngOnInit(): void {
    this.store.dispatch(new LoadPortfolioFiles());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // necessary to allow drop
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    const files = event.dataTransfer?.files;
    if (files?.length) {
      // this.handleFileUpload(files); // your upload logic
    }
  }

  updateBreadcrumb(): void {
    this.breadcrumbs = this.currentPath.split('/').filter(Boolean);
  }

  goToSelectedFolder(folder: string) {
    this.currentPath += `${folder}/`;
    this.updateBreadcrumb();
    this.store.dispatch(new LoadPortfolioFiles(this.currentPath));
  }

  onBreadcrumbClick(index: number) {
    const newPath = this.breadcrumbs.slice(0, index + 1).join('/') + '/';
    this.currentPath = newPath;
    this.updateBreadcrumb();
    this.store.dispatch(new LoadPortfolioFiles(newPath));
  }

  protected readonly STORAGE_PROVIDERS_DATA = STORAGE_PROVIDERS_DATA;
  protected readonly formatCamelCase = formatCamelCase;
  protected readonly extractFolderNameFromPath = extractFolderNameFromPath;
  protected readonly formatFileSize = formatFileSize;
  protected readonly formatDisplayDate = formatDisplayDate;
}
