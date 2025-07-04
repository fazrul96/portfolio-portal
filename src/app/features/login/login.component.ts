import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {filter, from, switchMap, take, tap} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {AuthService} from '@auth0/auth0-angular';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {UserLoginAuth0} from '../../store/user/user.action';
import {UserRole} from '../../shared/enums/user-role.enum';
import {MobilePrefix} from '../../shared/enums/mobile-prefix.enum';
import {IdType} from '../../shared/enums/id-type.enum';
import {ROUTE_PATHS} from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  private readonly auth: AuthService = inject(AuthService);

  onLoginUserWithAuth0(): void {
    this.auth.isAuthenticated$.pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.auth.loginWithRedirect({
            appState: { target: COMMON_CONSTANTS.SLASH }
          });
        }
      }),
      filter(isAuthenticated => isAuthenticated),
      switchMap(() => this.auth.user$),
      switchMap(user =>
        from(this.auth.getAccessTokenSilently()).pipe(
          switchMap(token => {
            if (user && token) {
              const sub: string = user.sub ?? COMMON_CONSTANTS.EMPTY_STRING;
              const platform: string = sub.split(COMMON_CONSTANTS.DASH)[0]

              const registrationPayload: any = {
                email: user.email!,
                username: user.name!,
                idType: IdType.Nric,
                idNo: 'n/a',
                mobileNoPrefix: MobilePrefix.Msia,
                mobileNo: 'n/a',
                role: UserRole.User,
                platform: platform,
                picture: user.picture
              };

              this.store.dispatch(new UserLoginAuth0(registrationPayload)).subscribe({
                next: val => {
                  this.router.navigate([ROUTE_PATHS.dashboard]);
                }
              });
            } else {
              this.auth.loginWithRedirect({
                appState: { target: COMMON_CONSTANTS.SLASH }
              });
            }
            return [];
          })
        )
      )
    ).subscribe();
  }
}
