import {ExperienceCategories, ExperiencePortal} from '../../shared/types/portal.type';

export const EXPERIENCE_STATE_DEFAULTS: ExperienceStateModel = {
  experiences: [],
  experienceCategories: []
};

export interface ExperienceStateModel {
  experiences?: ExperiencePortal[];
  experienceCategories?: ExperienceCategories[];
}
