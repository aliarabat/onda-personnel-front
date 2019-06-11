import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../../../controller/service/employee-service.service';
import {EmployeeVo} from '../../../controller/model/employee.model';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-gestion-employees-list',
  templateUrl: './gestion-employees-list.component.html',
  styleUrls: ['./gestion-employees-list.component.css']
})
export class GestionEmployeesListComponent implements OnInit {

  constructor(private  employeeService: EmployeeServiceService, private router: Router) {
  }

  public employeeInfo: EmployeeVo = new EmployeeVo();

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router))
      this.employeeService.findAllEmployesExist();
  }

  public get employeesSearch() {
    return this.employeeService.employeeSearch;
  }

  public deleteEmployee(matricule: string) {
    this.employeeService.deleteEmployee(matricule);
  }

  public Revert(matricule: string) {
    this.employeeService.revert(matricule)

  }

  public updateEmployee() {
    this.employeeService.updateEmployee(this.newEmpl)
  }

  selectPerEmployee() {
    if ($("#inlineCheckboxperyear2").is(':checked')) {
      this.employeeService.findAllEmployeNotExist();
    } else {
      this.employeeService.findAllEmployesExist();

    }
  }

  public get newEmpl() {
    return this.employeeService.newEmployee
  }

  public findEmployeeById(id: number) {
    this.employeeService.findEmployeeyId(id);
  }

  employeeSearchChange(value: string) {
    this.employeeService.employeeSearchChange(value);
  }
}
