import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatChip} from "@angular/material/chips";
import {Color, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {MatIcon} from '@angular/material/icon';
import {Store} from '@ngxs/store';
import {LeetCodeStats} from '../../types/portal.type';
import {ExperienceState} from '../../../store/experience/experience.state';
import {MatCard, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {catchError, of, Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../constants/common.constants';

@Component({
  selector: 'app-card-leetcode',
  imports: [
    MatChip,
    MatIcon,
    NgxChartsModule,
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatIconButton,
    MatTooltip,
    MatProgressSpinner,
    MatProgressSpinner,
    MatProgressSpinner
  ],
  templateUrl: './card-leetcode.component.html',
  styleUrl: './card-leetcode.component.scss'
})
export class CardLeetcodeComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  leetcodeStats: LeetCodeStats | null = null;
  leetcodeLink: string = "https://leetcode.com/u/fazrul96/";
  chartData: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#DAA520', '#dc3545']
  };

  ngOnInit(): void {
    this.store.select(ExperienceState.getLeetcodeStats).pipe(
      catchError(error => {
        console.error('Failed to fetch LeetCode stats:', error);
        this.leetcodeStats = null;
        this.chartData = [];
        return of(null);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(stats => {
      if (stats) {
        this.leetcodeStats = stats;
        this.chartData = [
          {
            name: `Easy (${stats.easySolved}/${stats.totalEasy})`,
            value: stats.easySolved
          },
          {
            name: `Medium (${stats.mediumSolved}/${stats.totalMedium})`,
            value: stats.mediumSolved
          },
          {
            name: `Hard (${stats.hardSolved}/${stats.totalHard})`,
            value: stats.hardSolved
          }
        ];
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
