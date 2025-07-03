import {Component, inject, OnInit} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {PROFILE_CONTENT, PROFILE_DETAILS} from '../../data/profile.data';
import {CardSidenavComponent} from '../card-sidenav/card-sidenav.component';
import {CardSidenavResumeComponent} from '../card-sidenav-resume/card-sidenav-resume.component';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-card-profile-summary',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    DefaultLayoutDirective,
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutGapDirective,
    CardSidenavComponent,
    CardSidenavResumeComponent,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './card-profile-summary.component.html',
  styleUrl: './card-profile-summary.component.scss'
})
export class CardProfileSummaryComponent implements OnInit {
  readonly dialog: MatDialog = inject(MatDialog);
  profileContent: any = PROFILE_CONTENT;
  groupedDetails: any[] = [];

  ngOnInit(): void {
    for (let i: number = 0; i < PROFILE_DETAILS.length; i += 2) {
      this.groupedDetails.push(PROFILE_DETAILS.slice(i, i + 2));
    }
  }
}
