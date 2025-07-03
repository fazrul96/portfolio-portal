import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMenuItem} from '@angular/material/menu';

@Component({
  selector: 'app-switcher-dark-mode',
  imports: [
    MatIcon,
    MatMenuItem
  ],
  templateUrl: './switcher-dark-mode.component.html',
  styleUrl: './switcher-dark-mode.component.scss'
})
export class SwitcherDarkModeComponent {
  toggleDarkMode(): void {
    const isDark: boolean = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark.toString());
  }
}
