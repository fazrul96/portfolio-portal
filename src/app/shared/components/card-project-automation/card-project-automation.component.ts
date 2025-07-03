import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from "ng-flex-layout";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatChip, MatChipAvatar, MatChipListbox} from "@angular/material/chips";
import {MatListItem} from "@angular/material/list";
import {MatIcon} from '@angular/material/icon';
import {MatRipple} from '@angular/material/core';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {ProjectPortal} from '../../types/portal.type';
import {ProjectState} from '../../../store/project/project.state';
import {NgStyle} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  DialogAutomationDetailsComponent
} from '../dialog/dialog-automation-details/dialog-automation-details.component';

@Component({
  selector: 'app-card-project-automation',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    MatButton,
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
    MatRipple,
    NgStyle
  ],
  templateUrl: './card-project-automation.component.html',
  styleUrl: './card-project-automation.component.scss'
})
export class CardProjectAutomationComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly unsubscribe$ = new Subject();

  public automationProjects: ProjectPortal[] | undefined = [];

  openProjectDialog(project: any): void {
    this.dialog.open(DialogAutomationDetailsComponent, {
      width: '40vw',
      height: '30vh',
      maxWidth: '90vw',
      autoFocus: false,
      data: project
    });
  }

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

  ngOnInit(): void {
    this.store.select(ProjectState.getProjects).subscribe(projectList => {
      this.automationProjects = projectList!.filter(p => p.category === 'Automation');
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
