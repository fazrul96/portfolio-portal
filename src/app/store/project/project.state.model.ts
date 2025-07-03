import {ProjectPortal} from '../../shared/types/portal.type';

export const PROJECT_STATE_DEFAULTS: ProjectStateModel = {
  projects: []
};

export interface ProjectStateModel {
  projects?: ProjectPortal[];
}

