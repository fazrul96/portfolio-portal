import {Component, inject, OnInit} from '@angular/core';
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
export class CardLeetcodeComponent implements OnInit {
  private readonly store: Store = inject(Store);

  leetcodeStats!: LeetCodeStats | undefined;
  leetcodeLink: string = "https://leetcode.com/u/fazrul96/";
  chartData: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#DAA520', '#dc3545']
  };

  ngOnInit(): void {
    this.store.select(ExperienceState.getLeetcodeStats).subscribe(stats => {
      this.leetcodeStats = stats;
      if (stats) {
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
}
