export class GetExperience {
  static readonly type = '[EXPERIENCE] GET EXPERIENCE';
}

export class PostExperience {
  static readonly type = '[EXPERIENCE] POST EXPERIENCE';
  constructor(public payload: any) {}
}

export class DeleteExperience {
  static readonly type = '[EXPERIENCE] DELETE EXPERIENCE';
  constructor(public id: any) {}
}

export class PatchExperience {
  static readonly type = '[EXPERIENCE] UPDATE EXPERIENCE';
  constructor(public id: number, public updatedInfo: any) {}
}

export class GetExperienceCategories {
  static readonly type = '[EXPERIENCE CATEGORIES] GET EXPERIENCE CATEGORIES';
}
