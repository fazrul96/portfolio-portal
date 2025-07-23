import {Component} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {STORAGE_PROVIDERS_DATA} from '../../shared/data/project.data';

export interface StorageFile {
  name: string;
  size: string;
  lastModified: Date;
}

export interface StorageUsage {
  used: string;
  total: string;
  percent: number;
}

export interface StorageProvider {
  id: string;
  name: string;
  files: StorageFile[];
  usage: StorageUsage;
}

@Component({
  selector: 'app-storage',
  imports: [
    MatTabGroup,
    MatTab,
    MatIcon,
    MatButton,
    MatProgressBar,
    MatCard,
    MatIconButton,
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {
  activeTab = 0;
  uploading = false;

  uploadFile(providerId: string): void {
    const file: StorageFile = {
      name: `File_${Math.floor(Math.random() * 1000)}.txt`,
      size: `${(Math.random() * 5 + 0.5).toFixed(2)} MB`,
      lastModified: new Date()
    };

    this.uploading = true;

    // setTimeout(() => {
    //   const provider = this.STORAGE_PROVIDERS_DATA.find(p => p.id === providerId);
    //   if (provider) {
    //     provider.files.push(file);
    //     this.recalculateUsage(provider);
    //   }
    //   this.uploading = false;
    // }, 1000);
  }

  downloadFile(file: StorageFile): void {
    alert(`Downloading "${file.name}"...`);
  }

  renameFile(file: StorageFile): void {
    const newName = prompt('Enter new name:', file.name);
    if (newName?.trim()) {
      file.name = newName.trim();
    }
  }

  // deleteFile(fileToDelete: StorageFile): void {
  //   const provider = this.STORAGE_PROVIDERS_DATA[this.activeTab];
  //   provider.files = provider.files.filter(file => file !== fileToDelete);
  //   this.recalculateUsage(provider);
  // }

  recalculateUsage(provider: StorageProvider): void {
    const totalMB = this.getNumericSize(provider.usage.total);
    const usedMB = provider.files
      .map(f => this.getNumericSize(f.size))
      .reduce((acc, curr) => acc + curr, 0);

    provider.usage.used = `${usedMB.toFixed(2)} MB`;
    provider.usage.percent = (usedMB / totalMB) * 100;
  }

  getNumericSize(sizeStr: string): number {
    const match = sizeStr.match(/([\d.]+)\s*MB/i);
    return match ? parseFloat(match[1]) : 0;
  }
  protected readonly STORAGE_PROVIDERS_DATA = STORAGE_PROVIDERS_DATA;
}
