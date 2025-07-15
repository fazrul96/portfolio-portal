import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';
import {S3_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPublicUrl;

  getResumeFiles(): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.LIST_FILES}`;
    const params = { prefix: S3_API.PREFIXES.RESUME };
    return this.http.get<HttpResponseBody>(url, { params });
  }
}
