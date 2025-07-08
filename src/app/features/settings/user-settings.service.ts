import {Injectable} from '@angular/core';

export interface UserSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'ms';
  layout: 'grid' | 'list';
}

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  private readonly SETTINGS_KEY = 'userSettings';
  private readonly defaultSettings: UserSettings = {
    theme: 'dark',
    language: 'en',
    layout: 'grid',
  };
  private currentSettings: UserSettings;

  constructor() {
    this.currentSettings = this.loadSettings();
    this.applyTheme(this.currentSettings.theme);
  }

  private loadSettings(): UserSettings {
    const raw = localStorage.getItem(this.SETTINGS_KEY);
    return raw ? JSON.parse(raw) : this.defaultSettings;
  }

  getSettings(): UserSettings {
    return this.currentSettings;
  }

  saveSettings(settings: UserSettings): void {
    this.currentSettings = settings;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    this.applyTheme(settings.theme);
  }

  reset(): void {
    this.saveSettings(this.defaultSettings);
  }

  getDefault(): UserSettings {
    return this.defaultSettings;
  }

  applyTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }
}
