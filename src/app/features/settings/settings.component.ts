import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {UserSettings, UserSettingsService} from './user-settings.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-settings',
  imports: [
    MatOption,
    MatButton,
    FormsModule,
    MatSelect,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatCard,
    MatCardContent,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    MatLabel,
    MatDivider,
    MatFormField
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private readonly settingsService: UserSettingsService = inject(UserSettingsService);
  settings!: UserSettings;

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onChange(): void {
    this.settingsService.saveSettings(this.settings);
  }

  onReset(): void {
    this.settings = this.settingsService.getDefault();
    this.settingsService.reset();
  }
}
