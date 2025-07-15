import {Component, inject, OnInit, Signal} from '@angular/core';
import {MatCard, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import {MatChip, MatChipListbox} from '@angular/material/chips';
import {COMMON_CONSTANTS} from '../../constants/common.constants';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {PROFILE_CONTENT} from '../../data/profile.data';
import {MatIconButton} from '@angular/material/button';
import {UserService} from '../../../core/services/api/user.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogContactInfoComponent} from '../dialog/dialog-contact-info/dialog-contact-info.component';

@Component({
  selector: 'app-card-profile-intro',
  imports: [
    MatCard,
    MatChip,
    MatChipListbox,
    MatIcon,
    MatTooltip,
    MatCardActions,
    MatIconButton,
    MatCardSubtitle,
  ],
  templateUrl: './card-profile-intro.component.html',
  styleUrl: './card-profile-intro.component.scss'
})
export class CardProfileIntroComponent implements OnInit {
  readonly dialog: MatDialog = inject(MatDialog);
  readonly userService: UserService = inject(UserService);
  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  profileContent: any = PROFILE_CONTENT;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContactInfoComponent, {
      width: '50vw',
      height: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.profileContent = PROFILE_CONTENT;
  }

  protected readonly COMMON_CONSTANTS = COMMON_CONSTANTS;
}
