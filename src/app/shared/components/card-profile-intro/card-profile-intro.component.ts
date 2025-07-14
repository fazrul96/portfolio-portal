import {Component} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {MatCard} from '@angular/material/card';
import {MatChip, MatChipListbox} from '@angular/material/chips';
import {COMMON_CONSTANTS} from '../../constants/common.constants';
import {MatIcon} from '@angular/material/icon';
import {CardLeetcodeComponent} from '../card-leetcode/card-leetcode.component';

@Component({
  selector: 'app-card-profile-intro',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    MatCard,
    MatChip,
    MatChipListbox,
    MatIcon,
    CardLeetcodeComponent
  ],
  templateUrl: './card-profile-intro.component.html',
  styleUrl: './card-profile-intro.component.scss'
})
export class CardProfileIntroComponent {
  protected readonly COMMON_CONSTANTS = COMMON_CONSTANTS;
}
