import {DifficultyStats, ExperienceCategories, ExperiencePortal, LeetCodeStats} from '../../shared/types/portal.type';

export const EXPERIENCE_STATE_DEFAULTS: ExperienceStateModel = {
  experiences: [],
  experienceCategories: [],
  leetcodeStats: undefined,
  leetcodeSubmissions: []
};

export interface ExperienceStateModel {
  experiences?: ExperiencePortal[];
  experienceCategories?: ExperienceCategories[];
  leetcodeStats?: LeetCodeStats;
  leetcodeSubmissions?: DifficultyStats[];
}
