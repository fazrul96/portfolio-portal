import {AfterViewInit, Component, inject, OnInit, Renderer2, Signal, signal} from '@angular/core';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {HeaderComponent} from './layout/header/header.component';
import {UserState} from './store/user/user.state';
import {Store} from '@ngxs/store';
import {FooterComponent} from './layout/footer/footer.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {COMMON_CONSTANTS} from './shared/constants/common.constants';
import {UserSettings, UserSettingsService} from './features/settings/user-settings.service';

@Component({
  selector: 'app-root',
  imports: [LoadingSpinnerComponent, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly store: Store = inject(Store);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly router: Router = inject(Router);
  private readonly userSettings: UserSettingsService = inject(UserSettingsService);

  isLoggedIn: Signal<boolean> = signal(false);
  showHeaderFooter: boolean = false;
  title: string = 'portfolio-portal-v2';

  ngOnInit(): void {
    this.isLoggedIn = this.store.selectSignal(UserState.isLoggedIn);

    const settings: UserSettings = this.userSettings.getSettings();
    this.userSettings.applyTheme(settings.theme);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd): void => {
      const hideOnRoutes: string[] = [COMMON_CONSTANTS.SLASH];
      this.showHeaderFooter = !hideOnRoutes.includes(event.urlAfterRedirects);
    });
  }

  ngAfterViewInit() {
    const glitterContainer = document.getElementById('globalGlitter');
    if (!glitterContainer) return;

    window.addEventListener('mousemove', (event) => {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'particle');
      this.renderer.setStyle(particle, 'left', `${event.clientX}px`);
      this.renderer.setStyle(particle, 'top', `${event.clientY}px`);

      this.renderer.appendChild(glitterContainer, particle);

      setTimeout(() => {
        this.renderer.removeChild(glitterContainer, particle);
      }, 1000); // match animation duration
    });
  }
}
