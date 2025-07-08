import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {Subject, takeUntil} from 'rxjs';
import {Store} from '@ngxs/store';
import {GetBlogMediums} from '../../store/blog/blog.action';
import {BlogState} from '../../store/blog/blog.state';
import {BlogFeed, BlogItem} from '../../core/models/blog.model';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {DatePipe, SlicePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-blog-medium',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    SlicePipe,
    MatCardTitle,
    MatCardSubtitle,
  ],
  templateUrl: './blog-medium.component.html',
  styleUrl: './blog-medium.component.scss'
})
export class BlogMediumComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  public feed?: BlogFeed;
  public itemList?: BlogItem[] = [];
  public viewMode: 'grid' | 'list' = 'grid';

  ngOnInit(): void {
    this.store.dispatch(new GetBlogMediums());
    this.store.select(BlogState.getFeedProfileMediums)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(feed => this.feed = feed);

    this.store.select(BlogState.getItemMediums)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(items => this.itemList = items);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
