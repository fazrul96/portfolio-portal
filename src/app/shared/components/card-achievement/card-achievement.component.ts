import {Component} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';

@Component({
  selector: 'app-card-achievement',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
  ],
  templateUrl: './card-achievement.component.html',
  styleUrl: './card-achievement.component.scss'
})
export class CardAchievementComponent {

}
