export class GetWebtoon {
  static readonly type = '[WEBTOON] GET WEBTOON';
}

export class PostWebtoon {
  static readonly type = '[WEBTOON] POST WEBTOON';
  constructor(public payload: any) {}
}

export class DeleteWebtoon {
  static readonly type = '[WEBTOON] DELETE WEBTOON';
  constructor(public id: any) {}
}

export class PatchWebtoon {
  static readonly type = '[WEBTOON] UPDATE WEBTOON';
  constructor(public id: number, public webtoonInfo: any) {}
}
