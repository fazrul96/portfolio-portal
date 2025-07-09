import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../models/http-body.model';
import {PORTFOLIO_API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPublicUrl;

  getAllExperiences(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.BASE.experiences}`
    );
  }

  postExperience(payload: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.BASE.experiences}`, payload
    );
  }

  patchExperience(id: number, updatedInfo: any): Observable<HttpResponseBody> {
    return this.http.patch<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.ID_PATH(PORTFOLIO_API.BASE.experiences, id)}`,
      updatedInfo
    );
  }

  deleteExperience(id: number): Observable<HttpResponseBody> {
    return this.http.delete<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.ID_PATH(PORTFOLIO_API.BASE.experiences, id)}`
    );
  }

  getAllExperienceCategories(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      `${this.apiUrl}${PORTFOLIO_API.BASE.experienceCategories}`
    );
  }
}
