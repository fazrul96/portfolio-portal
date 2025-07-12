import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {SkillService} from '../../core/services/api/skill.service';
import {SKILL_STATE_DEFAULTS, SkillStateModel} from './skill.state.model';
import {DeleteSkill, GetSkill, PatchSkill, PostSkill} from './skill.action';
import {DeleteExperience} from '../experience/experience.action';

@State<SkillStateModel>({
  name: 'SkillState',
  defaults: SKILL_STATE_DEFAULTS
})

@Injectable()
export class SkillState {
  private readonly skillService: SkillService = inject(SkillService);

  @Selector()
  static getSkills(state: SkillStateModel) {
    return state.skills;
  }

  @Action(GetSkill)
  getSkills(ctx: StateContext<SkillStateModel>){
    return this.skillService.getAllSkills().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          skills: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PostSkill)
  postSkill(ctx: StateContext<SkillStateModel>, { payload }: PostSkill){
    return this.skillService.postSkill(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          skills: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteSkill)
  deleteSkill(ctx: StateContext<SkillStateModel>, { id }: DeleteExperience){
    return this.skillService.deleteSkill(id).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          skills: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PatchSkill)
  patchSkill(ctx: StateContext<SkillStateModel>, action: PatchSkill){
    const { id, updatedInfo } = action;
    return this.skillService.patchSkill(id, updatedInfo).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          skills: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
