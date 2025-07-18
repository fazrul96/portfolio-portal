export class GetResumeFiles {
  static readonly type = '[FILE] GET RESUME';
}

export class DownloadFile {
  static readonly type = '[FILE] DOWNLOAD FILE';
  constructor(public key: string, public isDownload: boolean = true) {}
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
