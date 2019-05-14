import {EmployeeVo} from './employee.model';
import {TimingVo} from './timing.model';

export class MissionVo {

  constructor(public id?: number, public reference?: string, public employee: EmployeeVo=new EmployeeVo(), public type?: string, public startingDate?: string,public startingTimeVo: TimingVo = new TimingVo('',''), public endingTimeVo: TimingVo = new TimingVo('','')) {
  }

}
