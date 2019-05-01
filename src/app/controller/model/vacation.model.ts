import {EmployeeVo} from './employee.model';

export class VacationVo {
  constructor(public id?: number, public employeeVo?: EmployeeVo, public reference?: string, public startingDate?: string, public endingDate?: string, public type?: string) {
  }
}
