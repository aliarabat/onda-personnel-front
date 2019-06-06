import {EmployeeVo} from './employee.model';
import {WorkDatailVo} from './work-datail.model';

export class WorkVo {

  constructor(public employeeVo?: EmployeeVo, public workDetailVo?: WorkDatailVo) {
  }

}
