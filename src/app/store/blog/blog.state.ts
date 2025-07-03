import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {BLOG_STATE_DEFAULTS, BlogMediumStateModel} from './blog.state.model';
import {BlogService} from '../../core/services/api/blog.service';
import {map, tap} from 'rxjs';
import {HttpResponseBody, HttpResponseBodyMedium} from '../../core/models/http-body.model';
import {GetAccountMessages, GetBlogMediums} from './blog.action';
import {EmailService} from '../../core/services/api/email.service';

@State<BlogMediumStateModel>({
  name: 'BlogState',
  defaults: BLOG_STATE_DEFAULTS
})

@Injectable()
export class BlogState {
  private readonly blogService: BlogService = inject(BlogService);
  private readonly emailService: EmailService = inject(EmailService);

  @Selector()
  static getFeedProfileMediums(state: BlogMediumStateModel) {
    return state.feed;
  }

  @Selector()
  static getItemMediums(state: BlogMediumStateModel) {
    return state.items;
  }

  @Action(GetBlogMediums)
  getBlogMediums(ctx: StateContext<BlogMediumStateModel>){
    return this.blogService.getBlogMediums().pipe(
      tap((response: HttpResponseBodyMedium): void => {
        if (response?.status === 'ok') {
          ctx.patchState({
            feed: response.feed,
            items: response.items
          });
        }
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetAccountMessages)
  getAccountMessages(ctx: StateContext<any>){
    return this.emailService.getAccountMessages().pipe(
      tap((response: HttpResponseBody): void => {
        console.log(response);
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
