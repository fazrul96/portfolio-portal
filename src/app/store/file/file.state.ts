import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {FILE_STATE_DEFAULTS, FileStateModel} from './file.state.model';
import {FileService} from '../../core/services/api/file.service';
import {GetResumeFile} from './file.action';
import {Files} from '../../shared/types/portal.type';

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

  @Action(GetResumeFile)
  getSkills(ctx: StateContext<FileStateModel>){
    return this.fileService.getResumeFiles().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          resumeFiles: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
