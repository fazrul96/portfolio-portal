import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatLine} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-storage-sidenav',
  imports: [
    MatButton,
    MatIcon,
    MatLine,
    MatListItem,
    MatNavList
  ],
  templateUrl: './storage-sidenav.component.html',
  styleUrl: './storage-sidenav.component.scss'
})
export class StorageSidenavComponent {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Favorites', icon: 'star' },
    { label: 'Shared', icon: 'people' },
    { label: 'Recycle Bin', icon: 'delete' },
    { label: 'Settings', icon: 'settings' },
  ];

  storageStats = [
    { icon: 'description', label: 'Documents', size: '2.2 GB' },
    { icon: 'photo', label: 'Photos', size: '13 GB' },
    { icon: 'movie', label: 'Videos', size: '42 GB' },
    { icon: 'music_note', label: 'Music', size: '1.8 GB' },
    { icon: 'more_horiz', label: 'Other Files', size: '16 GB' },
  ];
}
