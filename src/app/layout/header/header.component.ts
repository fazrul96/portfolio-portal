import {AfterViewInit, Component, computed, inject, Input, OnInit, signal, Signal, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {SwitcherDarkModeComponent} from '../../shared/components/switcher-dark-mode/switcher-dark-mode.component';
import {LoginComponent} from '../../features/login/login.component';
import {Store} from '@ngxs/store';
import {UserLogout} from '../../store/user/user.action';
import {UserState} from '../../store/user/user.state';
import {UserAuth0} from '../../core/models/user.model';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {MatCardModule} from '@angular/material/card';
import {User} from '@auth0/auth0-angular';
import {environment} from '../../../environments/environment';
import {EnvironmentFeatureFlags} from '../../core/models/configuration.model';

@Component({
  selector: 'app-header',
  imports: [
    MatSidenavModule, MatButtonModule, MatIcon, MatToolbar, MatMenu, MatMenuItem,
    MatMenuTrigger, MatBadge, SwitcherDarkModeComponent, LoginComponent,
    MatCardModule, MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @Input()isLoggedIn: boolean = false;

  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly observer: BreakpointObserver = inject(BreakpointObserver);

  username: Signal<string> = signal(COMMON_CONSTANTS.EMPTY_STRING)
  imageFailed = signal(false);
  userInfo: UserAuth0 = {};
  notificationList: any[] = [];
  featureFlags?: EnvironmentFeatureFlags = environment.featureFlags;

  ngOnInit(): void {
    this.username = this.store.selectSignal(UserState.getUsername);
    this.userInfo = this.store.selectSnapshot(UserState.getUser);
    // this.store.dispatch(new LoadAllNotifications()).subscribe();
    // this.store.select(PolicyProductState.getNotificationList).subscribe(notificationList => {
    //   this.notificationList = notificationList;
    // });
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      this.drawer.mode = res.matches ? 'over' : 'side';
      this.drawer.close();
    });
  }

  get userInitials(): string {
    const name: string = this.username();
    const initials: string = name
      .split(COMMON_CONSTANTS.SPACE)
      .map(n => n[0])
      .join(COMMON_CONSTANTS.EMPTY_STRING)
      .toUpperCase();

    return initials || 'G';
  }

  get profileImage(): string {
    return this.userInfo?.picture ?? COMMON_CONSTANTS.DEFAULT_IMG;
  }

  get hasProfileImage(): boolean {
    return !!this.userInfo?.picture;
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }

  home(): void {
    this.router.navigate([COMMON_CONSTANTS.SLASH]);
  }

  dashboard(): void {
    this.router.navigate(['dashboard']);
  }

  about(): void {
    this.router.navigate(['about']);
  }

  blog(): void {
    this.router.navigate(['blog-medium']);
  }

  achievement(): void {
    this.router.navigate(['achievement']);
  }

  resources(): void {
    this.router.navigate(['resources']);
  }

  contact(): void {
    this.router.navigate(['contact']);
  }

  profile(): void {
    this.router.navigate(['profile']);
  }

  settings(): void {
    this.router.navigate(['settings']);
  }

  workspace(): void {
    this.router.navigate(['workspace']);
  }

  logout(): void {
    this.store.dispatch(new UserLogout);
  }

  protected readonly COMMON_CONSTANTS = COMMON_CONSTANTS;
}
