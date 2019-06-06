import {DayVo} from './day.model';
import {TimingVo} from "./timing.model";

export class WorkDatailVo {

  constructor(public id?: number, public workDetailDate?: string, public pan?: string, public hn?: TimingVo, public hjf?: TimingVo, public daysVo?: Array<DayVo>, public skipNumber?: number,
              public missionNumber?: number,
              public  replacementNumber?: number,
              public  vacationNumber?: number,
              public  holidaysNumber?: number) {
  }

}
