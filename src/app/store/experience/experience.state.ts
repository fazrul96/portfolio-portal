import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {EXPERIENCE_STATE_DEFAULTS, ExperienceStateModel} from './experience.state.model';
import {ExperienceService} from '../../core/services/api/experience.service';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {DeleteExperience, GetExperience, PatchExperience, PostExperience} from './experience.action';

@State<ExperienceStateModel>({
  name: 'ExperienceState',
  defaults: EXPERIENCE_STATE_DEFAULTS
})

@Injectable()
export class ExperienceState {
  private readonly experienceService: ExperienceService = inject(ExperienceService);

  @Selector()
  static getExperiences(state: ExperienceStateModel) {
    return state.experiences;
  }

  @Action(GetExperience)
  getExperiences(ctx: StateContext<ExperienceStateModel>){
    const state: ExperienceStateModel = ctx.getState();
    return this.experienceService.getAllExperiences().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PostExperience)
  postExperience(ctx: StateContext<ExperienceStateModel>, { payload }: PostExperience){
    const state: ExperienceStateModel = ctx.getState();
    return this.experienceService.postExperience(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteExperience)
  deleteExperience(ctx: StateContext<ExperienceStateModel>, { id }: DeleteExperience){
    const state: ExperienceStateModel = ctx.getState();
    return this.experienceService.deleteExperience(id).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PatchExperience)
  patchExperience(ctx: StateContext<ExperienceStateModel>, action: PatchExperience){
    const { id, updatedInfo } = action;
    return this.experienceService.patchExperience(id, updatedInfo).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
