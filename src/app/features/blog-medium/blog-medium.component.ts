import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {Subject} from 'rxjs';
import {Store} from '@ngxs/store';
import {GetBlogMediums} from '../../store/blog/blog.action';
import {BlogState} from '../../store/blog/blog.state';
import {BlogFeed, BlogItem} from '../../core/models/blog.model';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';

@Component({
  selector: 'app-blog-medium',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
  ],
  templateUrl: './blog-medium.component.html',
  styleUrl: './blog-medium.component.scss'
})
export class BlogMediumComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  public feed: BlogFeed | undefined;
  public itemList: BlogItem[] | undefined = [];

  ngOnInit(): void {
    this.store.dispatch(new GetBlogMediums());
    this.store.select(BlogState.getFeedProfileMediums).subscribe(feed => {
      this.feed = feed;
    });
    this.store.select(BlogState.getItemMediums).subscribe(itemList => {
      this.itemList = itemList;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
