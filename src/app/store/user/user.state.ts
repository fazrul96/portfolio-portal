import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {map} from "rxjs";
import {UserLogin, UserLoginAuth0, UserLogout, UserRegistration} from "./user.action";
import {USER_STATE_DEFAULT, UserStateAuth0Model, UserStateModel} from "./user.state.model";
import {UserService} from '../../core/services/api/user.service';
import {MessageModalData} from '../../core/models/message-modal-data.model';
import {User} from '../../core/models/user.model';
import {HttpErrorBody} from '../../core/models/http-body.model';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';

@State<UserStateModel>({
  name: 'UserState',
  defaults: USER_STATE_DEFAULT
})

@Injectable()
export class UserState {
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);

  @Selector()
  static getJwtToken(state: UserStateModel): string {
    return structuredClone(state.jwtToken);
  }

  @Selector()
  static getUser(state: UserStateModel): User {
    return structuredClone(state.userDetails);
  }

  @Selector()
  static getUsername(state: UserStateModel): string {
    return structuredClone(state.userDetails.name);
  }

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return (state.jwtToken !== COMMON_CONSTANTS.EMPTY_STRING && state.userDetails.userId !== COMMON_CONSTANTS.EMPTY_STRING);
  }

  @Action(UserLogin)
  userLogin({setState}: StateContext<UserStateModel>, {payload}: UserLogin) {
    return this.userService.userLogin(payload).pipe(
      map(res => {
        setState({
          jwtToken: res.data.token,
          userDetails: {
            name: res.data.username,
            email: res.data.email,
            userId: res.data.userId
          }
        });
      })
    );
  }

  @Action(UserLoginAuth0)
  userLoginAuth0(ctx: StateContext<UserStateAuth0Model>, { payload }: UserLoginAuth0) {
    return this.userService.userLoginAuth0(payload).pipe(
      map(res => {
        const currentState = ctx.getState();

        ctx.setState({
          ...currentState,
          jwtToken: res.data.token,
          userDetails: {
            name: res.data.username,
            email: res.data.email,
            userId: res.data.userId,
            platform: payload.platform,
            picture: payload.picture
          }
        });
      })
    );
  }

  @Action(UserRegistration)
  userRegistration({}: StateContext<UserStateModel>, {payload}: UserRegistration) {
    return this.userService.userRegistration(payload).pipe(
      map(res => res? res.message as string : '')
    ).subscribe({
      next: (res: string) => {
        const messageData: MessageModalData = {
          header: 'Success',
          message: res
        };
      },
      error: (err: HttpErrorBody) => {
        const errorMessage = err.message?.includes('Duplicate entry')
          ? 'Error: Duplicate User.' : err?.message;
        const messageData: MessageModalData = {
          header: 'Error',
          message: errorMessage ?? 'Unexpected error occured.'
        };
      }
    });
  }

  @Action(UserLogout)
  userLogout({setState}: StateContext<UserStateModel>): void {
    setState(USER_STATE_DEFAULT);
    this.router.navigate([COMMON_CONSTANTS.EMPTY_STRING]);
  }
}
