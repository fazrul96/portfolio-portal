import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';
import {PROFILE_CONTENT} from '../../shared/data/profile.data';
import {DEVOPS_TOOLS, SOCIAL_LINKS, Tool} from '../../shared/data/project.data';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {SkillState} from '../../store/skill/skill.state';
import {GetSkill} from '../../store/skill/skill.action';

@Component({
  selector: 'app-profile',
  imports: [
    MatTooltip
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  profileContent: any = PROFILE_CONTENT;
  socialLinkList: any[] = SOCIAL_LINKS;
  tools: Tool[] = DEVOPS_TOOLS;
  skillsList: any[] | undefined = [];

  ngOnInit(): void {
    this.store.dispatch(new GetSkill());
    this.store.select(SkillState.getSkills).subscribe(skillsList => {
      this.skillsList = skillsList;
    });
    this.socialLinkList = SOCIAL_LINKS;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }
}
