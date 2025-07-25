import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {MatCard, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {SOCIAL_LINKS} from '../../data/project.data';
import {differenceInMonths, parse} from 'date-fns';
import {
  DialogExperienceDetailsComponent
} from '../dialog/dialog-experience-details/dialog-experience-details.component';
import {
  DialogExperienceCreationComponent
} from '../dialog/dialog-experience-creation/dialog-experience-creation.component';
import {
  DialogSocialLinkCreationComponent
} from '../dialog/dialog-social-link-creation/dialog-social-link-creation.component';
import {COMMON_CONSTANTS, EXPERIENCE_DATA} from '../../constants/common.constants';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {ExperienceState} from '../../../store/experience/experience.state';
import {GetExperience, GetExperienceCategories, GetStats} from '../../../store/experience/experience.action';
import {GetProject} from '../../../store/project/project.action';
import {CardSidenavResumeComponent} from '../card-sidenav-resume/card-sidenav-resume.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CardLeetcodeComponent} from '../card-leetcode/card-leetcode.component';
import {UserService} from '../../../core/services/api/user.service';
import {GetResumeFiles} from '../../../store/file/file.action';
import {DialogService} from '../../../core/services/dialog.service';

@Component({
  selector: 'app-card-sidenav',
  imports: [
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatIcon,
    MatIconButton,
    MatTooltip,
    CardSidenavResumeComponent,
    MatProgressSpinner,
    CardLeetcodeComponent
  ],
  templateUrl: './card-sidenav.component.html',
  styleUrl: './card-sidenav.component.scss'
})
export class CardSidenavComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly unsubscribe$ = new Subject();

  readonly userService: UserService = inject(UserService);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  experienceList: any[] | undefined = [];
  socialLinkList: any[] = [];

  experience = {
    startDate: EXPERIENCE_DATA.DEFAULT_START_DATE,
    endDate: EXPERIENCE_DATA.DEFAULT_END_DATE,
  };

  getDuration(startDate: string, endDate: string): string {
    if (!startDate) return COMMON_CONSTANTS.EMPTY_STRING;

    const start: Date = parse(startDate, 'MM/yyyy', new Date());
    const end: Date = endDate.toLowerCase() === 'present'
      ? new Date()
      : parse(endDate, 'MM/yyyy', new Date());

    const totalMonths: number = differenceInMonths(end, start);
    const years: number = Math.floor(totalMonths / 12);
    const months: number = totalMonths % 12;

    return `${years} yr ${months} mos`;
  }

  onExperienceKeyDown(event: KeyboardEvent, experience: any): void {
    if (event.key === 'Enter') {
      this.openDetailsExpDialog(experience);
    }
  }

  openAddExpDialog(): void {
    this.dialogService.showDialog(DialogExperienceCreationComponent);
  }

  openDetailsExpDialog(experience: any): void {
    this.dialogService.showDialog(DialogExperienceDetailsComponent, 0, experience);
  }

  openAddSocialDialog(): void {
    this.dialogService.showDialog(DialogSocialLinkCreationComponent);
  }

  dispatchInitialData(): void {
    this.store.dispatch([
      new GetProject(),
      new GetExperience(),
      new GetExperienceCategories(),
      new GetStats(),
      new GetResumeFiles(),
    ]);
    this.socialLinkList = SOCIAL_LINKS;
  }

  ngOnInit(): void {
    this.dispatchInitialData();

    this.store.select(ExperienceState.getExperiences).subscribe(experienceList => {
      this.experienceList = experienceList;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
