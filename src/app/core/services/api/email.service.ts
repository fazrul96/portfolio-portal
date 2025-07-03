import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = "https://spring-boot-app.mfzrl.cyou/api/v1/accounts/messages";

  getAccountMessages(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      this.apiUrl
    );
  }
}
