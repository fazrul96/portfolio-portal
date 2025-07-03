import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PAYMENT_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPrivateUrl;

  constructor() { }

  stripeCheckout(payload: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.apiUrl}${PAYMENT_API.POST_STRIPE_INTENT}`,
      payload
    );
  }
}
