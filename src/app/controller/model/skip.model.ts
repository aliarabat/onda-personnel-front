import {EmployeeVo} from './employee.model';
import {DetailVo} from './detail.model';

export class SkipVo {

  constructor(public id?: number, public reference?: string, public employeeVo?: EmployeeVo, public type?: string, public skipDate?: string, public detail?: DetailVo) {
  }

}
