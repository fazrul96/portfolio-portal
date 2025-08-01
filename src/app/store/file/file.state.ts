import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {FILE_STATE_DEFAULTS, FileStateModel} from './file.state.model';
import {FileService} from '../../core/services/api/aws/file.service';
import {
  DeleteItem,
  DeleteResumeFile,
  DownloadItem,
  GetPresignUrl,
  GetResumeFiles,
  LoadPortfolioFiles, UploadItem,
  UploadResumeFile,
} from './file.action';
import {Files, S3File} from '../../shared/types/portal.type';
import {extractFileNameFromKey} from '../../shared/utils/string.utils';
import {triggerBrowserDownload} from '../../shared/utils/file.utils';
import {DEFAULT_FOLDER_FILTER} from '../../shared/constants/file.constants';
import {UserService} from '../../core/services/api/user.service';

@State<FileStateModel>({
  name: 'FileState',
  defaults: FILE_STATE_DEFAULTS
})

@Injectable()
export class FileState {
  private readonly fileService: FileService = inject(FileService);
  private readonly userService: UserService = inject(UserService);

  @Selector()
  static getResumes(state: FileStateModel): Files {
    return state.resumeFiles;
  }

  @Selector()
  static getPresignedUrl(state: FileStateModel): string | undefined {
    return state.presignedUrl;
  }

  @Selector()
  static getPortfolioFolders(state: FileStateModel): S3File[] {
    return state.portfolioBucket.folders;
  }

  @Selector()
  static getPortfolioFiles(state: FileStateModel): S3File[] {
    return state.portfolioBucket.files;
  }

  @Action(LoadPortfolioFiles)
  getFiles(ctx: StateContext<FileStateModel>, { prefix }: LoadPortfolioFiles){
    return this.fileService.getFiles(prefix).pipe(
      tap((response: HttpResponseBody): void => {
        const isAdmin: boolean = this.userService.isAdmin();

        let folders = response.data.folders ?? [];

        if (!isAdmin) {
          const folderFilter: string[] = DEFAULT_FOLDER_FILTER;
          folders = folders.filter(
            (folder: string): boolean => !folderFilter.includes(folder)
          );
        }

        ctx.patchState({
          portfolioBucket: {
            folders: folders,
            files: response.data.files ?? []
          }
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetResumeFiles)
  getResumeFiles(ctx: StateContext<FileStateModel>){
    return this.fileService.getResumeFiles().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          resumeFiles: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetPresignUrl)
  getPresignUrl(ctx: StateContext<FileStateModel>, { key }: GetPresignUrl) {
    return this.fileService.getPresignUrl(key).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({ presignedUrl: response.data });
      }),
      map((): void => {})
    );
  }

  @Action(DownloadItem)
  downloadItem(ctx: StateContext<FileStateModel>, { item }: DownloadItem) {
    const { name } = item;
    return this.fileService.downloadItem(item).pipe(
      tap((response: Blob): void => {
        const fileName: string = extractFileNameFromKey(name);
        triggerBrowserDownload(response, fileName);
      }),
      map((): string => 'Download successful')
    );
  }

  @Action(DeleteItem)
  deleteItem(ctx: StateContext<FileStateModel>, { item }: DeleteItem) {
    return this.fileService.deleteItem(item).pipe(
      tap((response: HttpResponseBody): void => {
        const currentBucket = ctx.getState().portfolioBucket;

        if (!currentBucket) return;

        let updatedFolders = [...currentBucket.folders];
        let updatedFiles = [...currentBucket.files];

        if (item.type === 'folder') {
          updatedFolders = currentBucket.folders.filter(folder => folder.name !== item.name);
          updatedFiles = currentBucket.files.filter(file => !file.name.startsWith(item.name));
        } else {
          updatedFiles = currentBucket.files.filter(file => file.name !== item.name);
        }

        ctx.patchState({
          portfolioBucket: {
            folders: updatedFolders,
            files: updatedFiles
          }
        });
      }),
      map((): string => 'Delete successful')
    );
  }

  @Action(UploadItem)
  uploadItem(ctx: StateContext<FileStateModel>, { item, key }: UploadItem) {
    return this.fileService.uploadFile(item, key).pipe(
      tap(response => {
        const currentBucket = ctx.getState().portfolioBucket;

        const updatedBucket = {
          folders: currentBucket?.folders ?? [],
          files: currentBucket?.files ?? []
        };

        const newFiles = response.data.map((fileName: string) => ({
          name: fileName,
          size: 0,
          lastModified: new Date().toISOString(),
          type: ''
        }));

        updatedBucket.files = [...updatedBucket.files, ...newFiles];

        ctx.patchState({
          portfolioBucket: updatedBucket
        });
      }),
      map(response => response.message)
    );
  }

  @Action(UploadResumeFile)
  uploadResumeFile(ctx: StateContext<FileStateModel>, { payload }: UploadResumeFile){
    return this.fileService.uploadResumeFile(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          resumeFiles: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteResumeFile)
  deleteResumeFile(ctx: StateContext<FileStateModel>, { fileName }: DeleteResumeFile){
    return this.fileService.deleteResumeFile(fileName).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          resumeFiles: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
