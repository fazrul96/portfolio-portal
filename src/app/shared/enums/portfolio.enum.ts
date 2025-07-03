export interface SkillCategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type SkillType = 'Frontend' | 'Backend' | 'DevOps' | 'Tools' | 'Other';

export interface Skill {
  id: number;
  name: string;
  type: SkillType;
  avatar?: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
