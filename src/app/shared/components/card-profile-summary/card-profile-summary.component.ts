import {Component, inject, OnInit, Signal} from '@angular/core';
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
import {PROFILE_CONTENT, PROFILE_DETAILS} from '../../data/profile.data';
import {CardSidenavComponent} from '../card-sidenav/card-sidenav.component';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {CardProfileIntroComponent} from '../card-profile-intro/card-profile-intro.component';
import {SlicePipe} from '@angular/common';
import {UserService} from '../../../core/services/api/user.service';

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
    MatIcon,
    MatTooltip,
    CardProfileIntroComponent,
    SlicePipe,
  ],
  templateUrl: './card-profile-summary.component.html',
  styleUrl: './card-profile-summary.component.scss'
})
export class CardProfileSummaryComponent implements OnInit {
  readonly userService: UserService = inject(UserService);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  profileContent: any = PROFILE_CONTENT;
  groupedDetails: any[] = [];
  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    for (let i: number = 0; i < PROFILE_DETAILS.length; i += 2) {
      this.groupedDetails.push(PROFILE_DETAILS.slice(i, i + 2));
    }
  }
}
