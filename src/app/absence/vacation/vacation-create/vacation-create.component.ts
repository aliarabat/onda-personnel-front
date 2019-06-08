import {Component, OnInit} from '@angular/core';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {VacationService} from '../../../controller/service/vacation.service';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-vacation-create',
  templateUrl: './vacation-create.component.html',
  styleUrls: ['./vacation-create.component.css']
})
export class VacationCreateComponent implements OnInit {

  constructor(private  vacationService: VacationService, private router: Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.vacationService.findAllEmployees();
  }

  public get vacation() {
    return this.vacationService.vacationCreate
  }

  public saveVacation() {
    this.vacationService.saveVacation();
  }

  public get employeeVo() {
    return this.vacationService.employeeVo;
  }

  public get employee() {
    return this.vacationService.employee;
  }
}
