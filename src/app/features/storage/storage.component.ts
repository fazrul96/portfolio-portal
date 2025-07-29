import {Component, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
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
import {UserService} from '../../core/services/api/user.service';
import {SweetAlertResult} from 'sweetalert2';
import {SweetAlertService} from '../../core/services/sweet-alert.service';
import {StorageItemType} from '../../shared/enums/storage.enum';
import {ViewModeType} from '../../shared/enums/portfolio.enum';

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
  private readonly userService: UserService = inject(UserService);
  private readonly swalService: SweetAlertService = inject(SweetAlertService);
  private readonly unsubscribe$ = new Subject();

  readonly s3FolderList$ = this.store.select(FileState.getPortfolioFolders).pipe(
    map(folders =>
      folders.map(path => extractFolderNameFromPath(path))
    )
  );
  readonly s3FileList$ = this.store.select(FileState.getPortfolioFiles);
  readonly currentTabIndex = signal(0);
  readonly isUploading = signal(false);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  public dragging: boolean = false;
  public viewMode: ViewModeType = ViewModeType.GRID;

  breadcrumbs: string[] = [];
  selectedItem: any = null;
  currentPath: string = COMMON_CONSTANTS.EMPTY_STRING;

  ngOnInit(): void {
    this.store.dispatch(new LoadPortfolioFiles());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);
      this.isUploading.set(true);

      this.store.dispatch(new UploadItem(fileArray, this.currentPath))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (): void => this.swalService.showSuccess('Success', 'Files uploaded successfully.'),
          error: (): void => this.swalService.showError('Upload Failed', 'Something went wrong during upload.'),
          complete: (): void => this.isUploading.set(false)
        });
    } else {
      console.log('No files dropped');
      this.swalService.showInfo('No files', 'No files were dropped.');
    }
  }

  updateBreadcrumb(): void {
    this.breadcrumbs = this.currentPath.split(COMMON_CONSTANTS.SLASH).filter(Boolean);
  }

  goToSelectedFolder(folder: string): void {
    this.currentPath += `${folder}${COMMON_CONSTANTS.SLASH}`;
    this.updateBreadcrumb();
    this.store.dispatch(new LoadPortfolioFiles(this.currentPath));
  }

  onBreadcrumbClick(index: number): void {
    const newPath: string = this.breadcrumbs.slice(0, index + 1).join(COMMON_CONSTANTS.SLASH) + COMMON_CONSTANTS.SLASH;
    this.currentPath = newPath;
    this.updateBreadcrumb();
    this.store.dispatch(new LoadPortfolioFiles(newPath));
  }

  onMenuOpen(item: any): void {
    this.selectedItem = item;
  }

  createFolder(key: string): void {
    // Implementation here or remove if not needed
  }

  downloadSelectedItem(): void {
    const item: DownloadableItem | null = this.getSelectedStorageItem();
    if (!item) return;

    this.swalService.confirmDownload(this.selectedItem).then((result: SweetAlertResult): void => {
      if (result.isConfirmed) {
        this.store.dispatch(new DownloadItem(item))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((): void => {
            this.swalService.showSuccess('Downloaded!', `"${this.selectedItem}" is being downloaded.`);
          });
      }
    });
  }

  deleteSelectedItem(): void {
    const item: DownloadableItem | null = this.getSelectedStorageItem();
    if (!item) return;

    this.swalService.confirmDelete(this.selectedItem).then((result: SweetAlertResult): void => {
      if (result.isConfirmed) {
        this.store.dispatch(new DeleteItem(item))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((): void => {
            this.swalService.showSuccess('Deleted!', `"${this.selectedItem}" has been deleted.`);
          });
      }
    });
  }

  private getSelectedStorageItem(): DownloadableItem | null {
    if (!this.selectedItem) return null;

    const type: StorageItemType = this.getItemType(this.selectedItem);
    return {
      name: `${this.currentPath}${this.selectedItem}`,
      type
    };
  }

  private getItemType(name: string): StorageItemType {
    return name.includes(COMMON_CONSTANTS.DOT) ? StorageItemType.FILE : StorageItemType.FOLDER;
  }

  protected readonly formatCamelCase = formatCamelCase;
  protected readonly extractFolderNameFromPath = extractFolderNameFromPath;
  protected readonly formatFileSize = formatFileSize;
  protected readonly formatDisplayDate = formatDisplayDate;
  protected readonly ViewModeType = ViewModeType;
  protected readonly STORAGE_PROVIDERS_DATA = STORAGE_PROVIDERS_DATA;
}
