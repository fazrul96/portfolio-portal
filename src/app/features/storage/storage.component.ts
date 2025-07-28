import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {STORAGE_PROVIDERS_DATA} from '../../shared/data/project.data';
import {Store} from '@ngxs/store';
import {map, Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {DeleteItem, DownloadItem, LoadPortfolioFiles, UploadItem} from '../../store/file/file.action';
import {FileState} from '../../store/file/file.state';
import {AsyncPipe} from '@angular/common';
import {MatFormField, MatInput, MatPrefix} from '@angular/material/input';
import {extractFolderNameFromPath, formatFileSize} from '../../shared/utils/file.utils';
import {formatCamelCase} from '../../shared/utils/string.utils';
import {MatTooltip} from '@angular/material/tooltip';
import {formatDisplayDate} from '../../shared/utils/date.utils';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {DownloadableItem} from '../../shared/types/portal.type';

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
  public dragging: boolean = false;

  public viewMode: 'grid' | 'list' = 'grid';
  breadcrumbs: string[] = [];
  currentPath: string = COMMON_CONSTANTS.EMPTY_STRING;
  selectedItem: any = null;

  ngOnInit(): void {
    this.store.dispatch(new LoadPortfolioFiles());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
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

    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);
      this.store.dispatch(new UploadItem(fileArray, this.currentPath));
    } else {
      console.log('No files dropped');
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
    const newPath: string = this.breadcrumbs.slice(0, index + 1).join('/') + '/';
    this.currentPath = newPath;
    this.updateBreadcrumb();
    this.store.dispatch(new LoadPortfolioFiles(newPath));
  }

  onMenuOpen(item: any): void {
    this.selectedItem = item;

    console.log(this.selectedItem);
  }

  createBtn(key: string): void {
    // Implementation here or remove if not needed
  }

  downloadBtn(): void {
    if (this.selectedItem) {
      const isFile: string = this.selectedItem.includes(COMMON_CONSTANTS.DOT);
      const item: DownloadableItem = {
        name: `${this.currentPath}${this.selectedItem}`,
        type: isFile ? 'file' : 'folder'
      };

      this.store.dispatch(new DownloadItem(item))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  deleteBtn(): void {
    if (this.selectedItem) {
      const isFile: string = this.selectedItem.includes(COMMON_CONSTANTS.DOT);
      const item: DownloadableItem = {
        name: `${this.currentPath}${this.selectedItem}`,
        type: isFile ? 'file' : 'folder'
      };

      this.store.dispatch(new DeleteItem(item))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  protected readonly STORAGE_PROVIDERS_DATA = STORAGE_PROVIDERS_DATA;
  protected readonly formatCamelCase = formatCamelCase;
  protected readonly extractFolderNameFromPath = extractFolderNameFromPath;
  protected readonly formatFileSize = formatFileSize;
  protected readonly formatDisplayDate = formatDisplayDate;
}
