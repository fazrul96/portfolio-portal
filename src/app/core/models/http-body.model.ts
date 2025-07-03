import {BlogFeed, BlogItem} from './blog.model';

export interface HttpErrorBody {
  code?: number,
  errorDetails?: {error?: string},
  message?: string,
  status?: string,
  timestamp?: string
}

export interface HttpResponseBody {
  code?: number,
  data?: any,
  message?: string,
  status?: string,
  timestamp?: string
}

export interface HttpResponseBodyMedium {
  code?: number,
  data?: any,
  message?: string,
  status?: string,
  timestamp?: string
  feed?: BlogFeed;
  items?: BlogItem[];
}
