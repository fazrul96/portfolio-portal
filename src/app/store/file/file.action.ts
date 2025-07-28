import {DownloadableItem} from '../../shared/types/portal.type';

export class GetResumeFiles {
  static readonly type = '[FILE] GET RESUME';
}

export class UploadItem {
  static readonly type = '[FILE] UPLOAD ITEM';
  constructor(public item: File[], public key: string) {}
}

export class DownloadItem {
  static readonly type = '[FILE] DOWNLOAD ITEM';
  constructor(public item: DownloadableItem) {}
}

export class DeleteItem {
  static readonly type = '[FILE] DELETE ITEM';
  constructor(public item: DownloadableItem) {}
}

export class UploadResumeFile {
  static readonly type = '[FILE] POST RESUME';
  constructor(public payload: any) {}
}

export class DeleteResumeFile {
  static readonly type = '[FILE] DELETE RESUME';
  constructor(public fileName: any) {}
}

export class GetPresignUrl {
  static readonly type = '[FILE] GET PRESIGNED URL';
  constructor(public key: any) {}
}

export class LoadPortfolioFiles {
  static readonly type = '[FILE] GET PORTFOLIO FILES';
  constructor(public prefix?: string) {}
}
