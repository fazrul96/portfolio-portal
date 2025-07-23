import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {MatLine} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {MatChip} from '@angular/material/chips';
import {combineLatest, distinctUntilChanged, filter, map, Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {WebtoonPortal} from '../../shared/types/portal.type';
import {WebtoonState} from '../../store/webtoon/webtoon.state';
import {Store} from '@ngxs/store';
import {DatePipe} from '@angular/common';
import {formatCamelCase} from '../../shared/utils/string.utils';

@Component({
  selector: 'app-webtoon-series',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatList,
    MatLine,
    MatListItem,
    MatChip,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './webtoon-series.component.html',
  styleUrl: './webtoon-series.component.scss'
})
export class WebtoonSeriesComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly unsubscribe$ = new Subject();

  selectedWebtoon: WebtoonPortal | null = null;
  chapterList: number[] = [];
  webtoonTitle: string = COMMON_CONSTANTS.EMPTY_STRING;
  breadcrumbs: Array<{ label: string; link?: string }> = [];

  ngOnInit(): void {
    const title$ = this.route.paramMap.pipe(
      map(params => params.get('title') ?? COMMON_CONSTANTS.EMPTY_STRING),
      distinctUntilChanged()
    );

    const webtoons$ = this.store.select(WebtoonState.getWebtoons).pipe(
      filter((webtoons): webtoons is WebtoonPortal[] => !!webtoons)
    );

    combineLatest([title$, webtoons$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([title, webtoons]): void => {
        this.webtoonTitle = title;
        this.selectedWebtoon = webtoons.find(w => w.title === title) ?? null;

        this.chapterList = this.selectedWebtoon?.chapterCount
          ? Array.from({ length: this.selectedWebtoon.chapterCount }, (_, i) => this.selectedWebtoon!.chapterCount - i)
          : [];

        this.breadcrumbs = [
          { label: 'Webtoon', link: 'webtoon' },
          { label: formatCamelCase(title) }
        ];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  goToSelectedChapter(chapter: number): void {
    this.router.navigate([`/webtoon-reader/${this.webtoonTitle}/chapter/${chapter}`]);
  }
}
