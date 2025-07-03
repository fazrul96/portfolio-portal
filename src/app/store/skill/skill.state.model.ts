import {SkillPortal} from '../../shared/types/portal.type';

export const SKILL_STATE_DEFAULTS: SkillStateModel = {
  skills: []
};

export interface SkillStateModel {
  skills?: SkillPortal[];
}
