import {ExperiencePortal} from '../../shared/types/portal.type';

export const EXPERIENCE_STATE_DEFAULTS: ExperienceStateModel = {
  experiences: []
};

export interface ExperienceStateModel {
  experiences?: ExperiencePortal[];
}
