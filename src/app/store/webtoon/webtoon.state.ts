import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {WEBTOON_STATE_DEFAULTS, WebtoonStateModel} from './webtoon.state.model';
import {WebtoonService} from '../../core/services/api/webtoon/webtoon.service';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {DeleteWebtoon, GetWebtoon, PatchWebtoon, PostWebtoon} from './webtoon.action';

@State<WebtoonStateModel>({
  name: 'WebtoonState',
  defaults: WEBTOON_STATE_DEFAULTS
})

@Injectable()
export class WebtoonState {
  private readonly service: WebtoonService = inject(WebtoonService);

  @Selector()
  static getWebtoons(state: WebtoonStateModel) {
    return state.webtoons;
  }

  @Action(GetWebtoon)
  getWebtoons(ctx: StateContext<WebtoonStateModel>){
    return this.service.getAllWebtoons().pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          webtoons: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PostWebtoon)
  postWebtoon(ctx: StateContext<WebtoonStateModel>, { payload }: PostWebtoon){
    return this.service.postWebtoon(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          webtoons: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(DeleteWebtoon)
  deleteWebtoon(ctx: StateContext<WebtoonStateModel>, { id }: DeleteWebtoon){
    return this.service.deleteWebtoon(id).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          webtoons: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(PatchWebtoon)
  patchWebtoon(ctx: StateContext<WebtoonStateModel>, action: PatchWebtoon){
    const { id, webtoonInfo } = action;
    return this.service.patchWebtoon(id, webtoonInfo).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.patchState({
          webtoons: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
