import {ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit, signal, Signal, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {LoginComponent} from '../../features/login/login.component';
import {Store} from '@ngxs/store';
import {UserLogout} from '../../store/user/user.action';
import {UserState} from '../../store/user/user.state';
import {UserAuth0} from '../../core/models/user.model';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {MatCardModule} from '@angular/material/card';
import {environment} from '../../../environments/environment';
import {EnvironmentFeatureFlags} from '../../core/models/configuration.model';
import {Subject, takeUntil} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ROUTE_PATHS} from '../../app.routes';
import {UserService} from '../../core/services/api/user.service';

@Component({
  selector: 'app-header',
  imports: [
    MatSidenavModule, MatButtonModule, MatIcon, MatToolbar, MatMenu, MatMenuItem,
    MatMenuTrigger, MatBadge, LoginComponent,
    MatCardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isLoggedIn: boolean = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly observer: BreakpointObserver = inject(BreakpointObserver);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly userService: UserService = inject(UserService);
  private readonly unsubscribe$ = new Subject();

  username: Signal<string> = signal(COMMON_CONSTANTS.EMPTY_STRING);
  imageFailed = signal(false);
  featureFlags?: EnvironmentFeatureFlags = environment.featureFlags;
  userInfo: UserAuth0 = {};
  notificationList: any[] = [];
  isSmallScreen: boolean = false;
  isAdmin: Signal<boolean> = this.userService.isAdmin;

  ngOnInit(): void {
    this.initializeUserData();
    this.detectScreenSize();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  private initializeUserData(): void {
    this.username = this.store.selectSignal(UserState.getUsername);
    this.userInfo = this.store.selectSnapshot(UserState.getUser);
  }

  private detectScreenSize(): void {
    this.observer.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.cdr.detectChanges();
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

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.store.dispatch(new UserLogout);
  }

  protected readonly COMMON_CONSTANTS = COMMON_CONSTANTS;
  protected readonly ROUTE_PATHS = ROUTE_PATHS;
}
