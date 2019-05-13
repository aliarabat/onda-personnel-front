import {DetailVo} from './detail.model';
import {ReplacementVo} from './replacement.model';
import {SkipVo} from './skip.model';
import {MissionVo} from './mission.model';

export class DayDetailVo {
  constructor(public id?: number, public detailVo?: DetailVo, public replacementVo?: ReplacementVo, public skipVo?: SkipVo , public missionVo?: MissionVo) {
  }

}
