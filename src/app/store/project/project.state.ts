import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {PROJECT_STATE_DEFAULTS, ProjectStateModel} from './project.state.model';
import {ProjectService} from '../../core/services/api/project.service';
import {map, tap} from 'rxjs';
import {DeleteProject, GetProject, PatchProject, PostProject} from './project.action';
import {HttpResponseBody} from '../../core/models/http-body.model';

@State<ProjectStateModel>({
  name: 'ProjectState',
  defaults: PROJECT_STATE_DEFAULTS
})

@Injectable()
export class ProjectState {
  private readonly projectService: ProjectService = inject(ProjectService);

  @Selector()
  static getProjects(state: ProjectStateModel) {
    return state.projects;
  }

  @Action(GetProject)
  getProjects(ctx: StateContext<ProjectStateModel>){
    const state: ProjectStateModel = ctx.getState();
    return this.projectService.getAllProjects().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          projects: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PostProject)
  postProject(ctx: StateContext<ProjectStateModel>, { payload }: PostProject){
    const state: ProjectStateModel = ctx.getState();
    return this.projectService.postProject(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          projects: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteProject)
  deleteProject(ctx: StateContext<ProjectStateModel>, { id }: DeleteProject){
    const state: ProjectStateModel = ctx.getState();
    return this.projectService.deleteProject(id).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          projects: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PatchProject)
  patchProject(ctx: StateContext<ProjectStateModel>, action: PatchProject){
    const { id, updatedInfo } = action;
    return this.projectService.patchProject(id, updatedInfo).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          projects: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
