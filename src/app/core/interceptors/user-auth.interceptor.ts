import {inject} from '@angular/core';
import {HttpContextToken, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {User} from '../models/user.model';
import {UserState} from '../../store/user/user.state';

export const SkipUserAuthHeaders = new HttpContextToken<boolean>(() => false);

export const userAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const store: Store = inject(Store);

  const shouldSkipHeaders: boolean = request.context.get(SkipUserAuthHeaders);
  if (shouldSkipHeaders) {
    return next(request);
  }

  const isCustomAuth: boolean = store.selectSnapshot(UserState.isLoggedIn);

  if (isCustomAuth) {
    const jwtToken: string = store.selectSnapshot(UserState.getJwtToken);
    const currentUser: User = store.selectSnapshot(UserState.getUser);

    const isFormData: boolean = request.body instanceof FormData;

    let customHeaders: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
      'userId': currentUser.userId
    });

    if (!isFormData) {
      customHeaders = customHeaders.set('Content-Type', 'application/json');
    }

    return next(request.clone({ headers: customHeaders }));
  }
  return next(request);
};
