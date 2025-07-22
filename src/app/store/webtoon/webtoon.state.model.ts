import {WebtoonPortal} from '../../shared/types/portal.type';

export const WEBTOON_STATE_DEFAULTS: WebtoonStateModel = {
  webtoons: []
};

export interface WebtoonStateModel {
  webtoons?: WebtoonPortal[];
}
