import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';
import {HttpClient} from '@angular/common/http';
import {MEDIUM_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = MEDIUM_API.MEDIUM;

  getBlogMediums(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      this.apiUrl
    );
  }
}
