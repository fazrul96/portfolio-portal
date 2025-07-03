import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatAnchor, MatButton, MatFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatChip, MatChipAvatar, MatChipListbox} from "@angular/material/chips";
import {MatListItem} from "@angular/material/list";
import {NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {ProjectPortal} from '../../types/portal.type';
import {MatRipple} from '@angular/material/core';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {ProjectState} from '../../../store/project/project.state';
import {BUTTON_CONFIGS, ButtonConfig} from '../../data/project.data';

@Component({
  selector: 'app-card-project',
  imports: [
    MatAnchor,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatChip,
    MatChipAvatar,
    MatChipListbox,
    MatIcon,
    MatListItem,
    NgStyle,
    MatButton,
    DefaultFlexDirective,
    MatRipple,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    DefaultLayoutAlignDirective,
    MatFabButton,
  ],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.scss'
})
export class CardProjectComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  public fullstackProjects: ProjectPortal[] | undefined = [];
  public buttonConfigs: ButtonConfig[] = BUTTON_CONFIGS;
  visibleProjectsCount: number = 3;
  showAllProjects: boolean = false;

  getStatusColor(index: number): string {
    const colors: string[] = ['palegoldenrod', 'lightblue', 'lightgreen', 'salmon'];
    return colors[index % colors.length];
  }

  onCardMouseMove(event: MouseEvent, id: string): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${xPercent}%`);
    card.style.setProperty('--mouse-y', `${yPercent}%`);
  }

  onCardMouseLeave(id: string): void {
    const card = document.querySelector(`[data-project-id="${id}"]`) as HTMLElement;
    if (card) {
      card.style.setProperty('--mouse-x', `50%`);
      card.style.setProperty('--mouse-y', `50%`);
    }
  }

  toggleActive(button: ButtonConfig): void {
    this.buttonConfigs.forEach(btn => {
      btn.isActive = false;
    });
    button.isActive = true;
  }

  toggleShowMore(): void {
    this.showAllProjects = !this.showAllProjects;
    if (this.showAllProjects) {
      this.visibleProjectsCount = this.fullstackProjects!.length;
    } else {
      this.visibleProjectsCount = 3;
    }
  }

  ngOnInit(): void {
    this.store.select(ProjectState.getProjects).subscribe(projectList => {
      this.fullstackProjects = projectList
    });

    // this.store.select(ProjectState.getProjects).subscribe(projectList => {
    //   this.fullstackProjects = projectList!.filter(p => p.category === 'Fullstack');
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
