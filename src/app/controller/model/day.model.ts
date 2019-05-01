import {DayDetailVo} from './day-detail.model';
import {VacationVo} from './vacation.model';
import {TimingVo} from './timing.model';

export class DayVo {

  constructor( public dayDetailsVo: Array<DayDetailVo>=[], public id?: number, public pan?: string, public hn?: TimingVo, public he?: TimingVo, public dayDate?: string, public vacationVo?: VacationVo) {
  }

}
