export class GetSkill {
  static readonly type = '[SKILL] GET SKILL';
}

export class PostSkill {
  static readonly type = '[SKILL] POST SKILL';
  constructor(public payload: any) {}
}

export class DeleteSkill {
  static readonly type = '[SKILL] DELETE SKILL';
  constructor(public id: any) {}
}

export class PatchSkill {
  static readonly type = '[SKILL] UPDATE SKILL';
  constructor(public id: number, public updatedInfo: any) {}
}
