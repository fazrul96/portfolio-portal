export class GetProject {
  static readonly type = '[PROJECT] GET PROJECT';
}

export class PostProject {
  static readonly type = '[PROJECT] POST PROJECT';
  constructor(public payload: any) {}
}

export class DeleteProject {
  static readonly type = '[PROJECT] DELETE PROJECT';
  constructor(public id: any) {}
}

export class PatchProject {
  static readonly type = '[PROJECT] UPDATE PROJECT';
  constructor(public id: number, public updatedInfo: any) {}
}
