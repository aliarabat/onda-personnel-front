import {EmployeeVo} from './employee.model';
import {DetailVo} from './detail.model';

export class ReplacementVo {

  constructor(public id?: number, public reference?: string, public originalEmployee?: EmployeeVo, public replacedEmployee?: EmployeeVo, public replacementDate?: string, public detailVo?: DetailVo) {
  }

}
