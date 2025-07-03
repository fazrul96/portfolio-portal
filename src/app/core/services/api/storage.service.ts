import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPrivateUrl;

  constructor() { }
}
