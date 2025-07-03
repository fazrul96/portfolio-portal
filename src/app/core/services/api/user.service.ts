import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLoginForm, UserRegistrationForm} from '../../models/user.model';
import {SkipUserAuthHeaders} from '../../interceptors/user-auth.interceptor';
import {HttpResponseBody} from '../../models/http-body.model';
import {environment} from '../../../../environments/environment';
import {USER_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPublicUrl;

  constructor() { }

  userLogin(payload: UserLoginForm): Observable<HttpResponseBody> {
    const httpContext = new HttpContext().set(SkipUserAuthHeaders, true);
    return this.http.post<HttpResponseBody>(
      `${this.apiUrl}${USER_API.USER_LOGIN}`,
      payload,
      { context: httpContext }
    );
  }

  userLoginAuth0(payload: any): Observable<HttpResponseBody> {
    const httpContext = new HttpContext().set(SkipUserAuthHeaders, true);
    return this.http.post<HttpResponseBody>(
      `${this.apiUrl}${USER_API.USER_LOGIN_AUTH0}`,
      payload,
      { context: httpContext }
    );
  }

  userRegistration(payload: UserRegistrationForm): Observable<HttpResponseBody> {
    const httpContext = new HttpContext().set(SkipUserAuthHeaders, true);
    return this.http.post<HttpResponseBody>(
      `${this.apiUrl}${USER_API.USER_REGISTRATION}`,
      payload,
      { context: httpContext }
    );
  }
}
