import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Subject} from 'rxjs';
import {ExperienceState} from '../../../store/experience/experience.state';
import {COMMON_CONSTANTS} from '../../constants/common.constants';
import {Store} from '@ngxs/store';
import {ExperiencePortal} from '../../types/portal.type';
import {EnvironmentFeatureFlags} from '../../../core/models/configuration.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-stepper-experience',
  imports: [
    MatTabsModule, MatStepperModule, MatButtonModule
  ],
  templateUrl: './stepper-experience.component.html',
  styleUrl: './stepper-experience.component.scss'
})
export class StepperExperienceComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();
  experienceList: ExperiencePortal[] | undefined = [];
  featureFlags?: EnvironmentFeatureFlags = environment.featureFlags;

  ngOnInit(): void {
    this.store.select(ExperienceState.getExperiences).subscribe(experienceList => {
      this.experienceList = experienceList;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
