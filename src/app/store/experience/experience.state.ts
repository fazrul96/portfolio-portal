import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {EXPERIENCE_STATE_DEFAULTS, ExperienceStateModel} from './experience.state.model';
import {ExperienceService} from '../../core/services/api/experience.service';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {
  DeleteExperience,
  GetExperience,
  GetExperienceCategories,
  GetStats,
  PostSubmitStats,
  PatchExperience,
  PostExperience
} from './experience.action';

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

  @Selector()
  static getExperienceCategories(state: ExperienceStateModel) {
    return state.experienceCategories;
  }

  @Selector()
  static getLeetcodeStats(state: ExperienceStateModel) {
    return state.leetcodeStats;
  }

  @Action(GetExperience)
  getExperiences(ctx: StateContext<ExperienceStateModel>){
    return this.experienceService.getAllExperiences().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  // CORS for leetcode
  @Action(PostSubmitStats)
  postSubmitStats(ctx: StateContext<ExperienceStateModel>, { payload } : any){
    return this.experienceService.postLeetcodeGraphql(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          leetcodeSubmissions: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetStats)
  getStats(ctx: StateContext<ExperienceStateModel>){;
    return this.experienceService.getLeetcodeStats().pipe(
      tap((response: any): void => {
        ctx.patchState({
          leetcodeStats: response
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetExperienceCategories)
  getExperienceCategories(ctx: StateContext<ExperienceStateModel>){
    return this.experienceService.getAllExperienceCategories().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          experienceCategories: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PostExperience)
  postExperience(ctx: StateContext<ExperienceStateModel>, { payload }: PostExperience){
    return this.experienceService.postExperience(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          experiences: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteExperience)
  deleteExperience(ctx: StateContext<ExperienceStateModel>, { id }: DeleteExperience){
    return this.experienceService.deleteExperience(id).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
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
