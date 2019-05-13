import {EmployeeVo} from './employee.model';
import {DetailVo} from './detail.model';

export class MissionVo {

  constructor(public id?: number, public reference?: string, public employee?: EmployeeVo, public type?: string, public startingDate?: string,public detailVo: DetailVo=new DetailVo()) {
  }

}
