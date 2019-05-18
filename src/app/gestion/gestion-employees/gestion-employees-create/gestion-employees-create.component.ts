import { Component, OnInit } from '@angular/core';
import {EmployeeServiceService} from '../../../controller/service/employee-service.service';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-gestion-employees-create',
  templateUrl: './gestion-employees-create.component.html',
  styleUrls: ['./gestion-employees-create.component.css']
})
export class GestionEmployeesCreateComponent implements OnInit {

  constructor(private employeeService : EmployeeServiceService, private router:Router) { }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

  public get employee(){
    return this.employeeService.employeeCreate;
  }

  public  get employees(){
    return this.employeeService.employees;
  }

  public addEmployee(){
    this.employeeService.addEmployee();
  }

  public renitialiser(){
    this.employeeService.reinitialiser();
  }

  public saveEmployee(){
    this.employeeService.saveEmployee();
  }

  deleteRow(matricule){
    for(let i = 0; i < this.employeeService.employees.length; ++i){
      if (this.employeeService.employees[i].matricule === matricule) {
        this.employeeService.employees.splice(i,1);
      }
    }
  }
}
