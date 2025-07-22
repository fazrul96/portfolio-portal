import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {MatTooltip} from '@angular/material/tooltip';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective} from 'ng-flex-layout';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Subject, takeUntil} from 'rxjs';
import {GetWebtoon} from '../../store/webtoon/webtoon.action';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {WebtoonState} from '../../store/webtoon/webtoon.state';
import {WebtoonPortal} from '../../shared/types/portal.type';

@Component({
  selector: 'app-webtoon',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatChip,
    MatTooltip,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
  ],
  templateUrl: './webtoon.component.html',
  styleUrl: './webtoon.component.scss'
})
export class WebtoonComponent implements OnInit, OnDestroy {
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  webtoonList: WebtoonPortal[] | undefined = [];
  genres: string[] = ['Action', 'Fantasy', 'Drama', 'Adventure', 'Mystery'];

  selectedTab: number = 0;
  searchQuery: string = '';
  viewMode: 'grid' | 'list' = 'grid';

  dispatchInitialData(): void {
    this.store.dispatch([
      new GetWebtoon(),
    ]);

    this.store.select(WebtoonState.getWebtoons)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(webtoons => this.webtoonList = webtoons);
  }

  ngOnInit(): void {
    if (this.webtoonList) {
      this.genres = Array.from(new Set(this.webtoonList.map(t => t.genre)))
        .sort((a: string, b: string): number => a.localeCompare(b));
    }

    this.dispatchInitialData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  get filteredWebtoons(): WebtoonPortal[] | undefined {
    if (this.webtoonList) {
      return this.webtoonList.filter(w =>
        this.searchQuery ? w.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true
      );
    }
    return this.webtoonList;
  }

  syncWebtoons(): void {
    console.log('Syncing webtoons...');
  }

  addNewWebtoon(): void {
    console.log('Add new webtoon...');
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/share/404-not-found.jpeg';
  }

  goToWebtoonSeries(title: string): void {
    this.router.navigate(['webtoon-series', title.toString()]);
  }

  getStatusColor(status: string): 'primary' | 'warn' | 'accent' {
    return status === 'Ongoing' ? 'primary' : status === 'Hiatus' ? 'accent' : 'warn';
  }
}
