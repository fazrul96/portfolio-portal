import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';
import {PORTFOLIO_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPrivateUrl;

  constructor() { }

  getUserNotifications(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.BASE.notifications}`
    );
  }
}
