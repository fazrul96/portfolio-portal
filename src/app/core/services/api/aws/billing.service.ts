import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../../models/http-body.model';
import {AWS_BILLING_API} from '../../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPublicUrl;

  getPreviousMonthSummary(): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${AWS_BILLING_API.GET_PREVIOUS}`;
    return this.http.get<HttpResponseBody>(url);
  }

  getPreviousMonthByService(): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${AWS_BILLING_API.GET_BY_SERVICE_PREVIOUS}`;
    return this.http.get<HttpResponseBody>(url);
  }
}
