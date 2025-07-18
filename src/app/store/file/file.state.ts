import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {FILE_STATE_DEFAULTS, FileStateModel} from './file.state.model';
import {FileService} from '../../core/services/api/file.service';
import {
  DeleteResumeFile,
  DownloadFile,
  GetPresignUrl,
  GetResumeFiles,
  UploadResumeFile,
} from './file.action';
import {Files} from '../../shared/types/portal.type';
import {extractFileNameFromKey} from '../../shared/utils/string.utils';
import {triggerBrowserDownload} from '../../shared/utils/file.utils';

@State<FileStateModel>({
  name: 'FileState',
  defaults: FILE_STATE_DEFAULTS
})

@Injectable()
export class FileState {
  private readonly fileService: FileService = inject(FileService);

  @Selector()
  static getResumes(state: FileStateModel): Files {
    return state.resumeFiles;
  }

  @Selector()
  static getPresignedUrl(state: FileStateModel): string | undefined {
    return state.presignedUrl;
  }

  @Selector()
  static getViewingBlob(state: FileStateModel): Blob | undefined {
    return state.viewingBlob;
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

  @Action(DownloadFile)
  viewDownloadFile(ctx: StateContext<FileStateModel>, { key }: DownloadFile) {
    return this.fileService.downloadFile(key).pipe(
      tap((response: Blob): void => {
        const fileName: string = extractFileNameFromKey(key);
        triggerBrowserDownload(response, fileName);
      }),
      map((): string => 'Download successful')
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
