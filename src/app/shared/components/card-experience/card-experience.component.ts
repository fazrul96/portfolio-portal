import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {StepperExperienceComponent} from '../stepper-experience/stepper-experience.component';
import {Subject} from 'rxjs';
import {COMMON_CONSTANTS} from '../../constants/common.constants';

@Component({
  selector: 'app-card-experience',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    MatTabsModule, MatStepperModule, MatButtonModule, StepperExperienceComponent
  ],
  templateUrl: './card-experience.component.html',
  styleUrl: './card-experience.component.scss'
})
export class CardExperienceComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
