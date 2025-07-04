import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
import {GetExperience} from '../../../store/experience/experience.action';
import {GetProject} from '../../../store/project/project.action';
import {UserState} from '../../../store/user/user.state';
import {User} from '@auth0/auth0-angular';
import {environment} from '../../../../environments/environment';
import {CardSidenavResumeComponent} from '../card-sidenav-resume/card-sidenav-resume.component';

@Component({
  selector: 'app-card-sidenav',
  imports: [
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatIcon,
    MatIconButton,
    MatTooltip,
    CardSidenavResumeComponent
  ],
  templateUrl: './card-sidenav.component.html',
  styleUrl: './card-sidenav.component.scss'
})
export class CardSidenavComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly unsubscribe$ = new Subject();

  readonly isLoggedIn: Signal<boolean> = this.store.selectSignal(UserState.isLoggedIn);
  readonly userDetailsSignal: Signal<User> = this.store.selectSignal(UserState.getUser);
  readonly isAdmin: Signal<boolean> = computed((): boolean => {
    const user: User = this.userDetailsSignal();
    return this.isLoggedIn() && user?.email === environment.user?.email;
  });

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
    // You can check for specific keys here, for example, if the user presses 'Enter':
    if (event.key === 'Enter') {
      this.openDetailsExpDialog(experience);
    }
    // You can also handle other keys like 'ArrowUp', 'ArrowDown', etc.
    console.log('Key pressed: ', event.key);
  }

  openAddExpDialog(): void {
    const dialogRef = this.dialog.open(DialogExperienceCreationComponent, {
      width: '35vw',
      height: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDetailsExpDialog(experience: any): void {
    const dialogRef = this.dialog.open(DialogExperienceDetailsComponent, {
      width: '30vw',
      height: '70vh',
      maxWidth: '40vw',
      autoFocus: false,
      data: experience
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddSocialDialog(): void {
    const dialogRef = this.dialog.open(DialogSocialLinkCreationComponent, {
      width: '20vw',
      height: '45vh',
      maxWidth: '40vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProject());
    this.store.dispatch(new GetExperience());
    this.store.select(ExperienceState.getExperiences).subscribe(experienceList => {
      this.experienceList = experienceList;
    });
    this.socialLinkList = SOCIAL_LINKS;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
