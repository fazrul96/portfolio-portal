import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../../../models/http-body.model';
import {S3_API} from '../../../../shared/constants/api.constants';
import {COMMON_CONSTANTS} from '../../../../shared/constants/common.constants';
import {DownloadableItem} from '../../../../shared/types/portal.type';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiBaseUrl + environment.apiPublicUrl;

  getFiles(prefix: string = COMMON_CONSTANTS.EMPTY_STRING): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.LIST_FILES}`;
    const params = { prefix: prefix };
    return this.http.get<HttpResponseBody>(url, { params });
  }

  getResumeFiles(): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.LIST_FILES}`;
    const params = { prefix: S3_API.PREFIXES.RESUME };
    return this.http.get<HttpResponseBody>(url, { params });
  }

  getPresignUrl(key: string): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.PRESIGN_URL}`;
    const params = { key: `${key}`};
    return this.http.get<HttpResponseBody>(url, { params });
  }

  uploadFile(files: File[], key: string): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.UPLOAD_FILES}`;
    const params = { prefix: key };
    const formData = new FormData();

    files.forEach(file => formData.append('files', file));

    return this.http.post<HttpResponseBody>(url, formData, { params });
  }

  uploadResumeFile(files: File[]): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.UPLOAD_FILES}`;
    const params = { prefix: `${S3_API.PREFIXES.RESUME}`};
    const formData = new FormData();

    files.forEach(file => formData.append('files', file));

    return this.http.post<HttpResponseBody>(url, formData, { params });
  }

  deleteResumeFile(fileName: string): Observable<HttpResponseBody> {
    const url = `${this.apiUrl}${S3_API.DELETE_FILE}`;
    const params = { fileName: `${S3_API.PREFIXES.RESUME}${fileName}`};

    return this.http.delete<HttpResponseBody>(url, { params });
  }

  downloadItem(item: DownloadableItem): Observable<Blob> {
    const endpoint: string = item.type === 'file' ? S3_API.DOWNLOAD_FILE : S3_API.DOWNLOAD_FOLDER;
    const paramKey = item.type === 'file' ? 'fileName' : 'folderName';

    return this.http.get(`${this.apiUrl}${endpoint}`, {
      params: { [paramKey]: item.name },
      responseType: 'blob'
    });
  }

  deleteItem(item: DownloadableItem): Observable<HttpResponseBody> {
    const endpoint: string = item.type === 'file' ? S3_API.DELETE_FILE : S3_API.DELETE_FOLDER;
    const paramKey = item.type === 'file' ? 'fileName' : 'folderName';

    return this.http.delete(`${this.apiUrl}${endpoint}`, {
      params: { [paramKey]: item.name }
    });
  }

  viewResumeFile(fileName: string): Observable<Blob> {
    const url = `${this.apiUrl}${S3_API.VIEW_FILE}`;
    const params = { fileName: `${fileName}` };

    return this.http.get(url, {
      params,
      responseType: 'blob'
    });
  }
}
