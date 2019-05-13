import {Component, Input, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../../../controller/service/employee-service.service';
import {EmployeeVo} from '../../../controller/model/employee.model';
import * as $ from 'jquery';
@Component({
  selector: 'app-gestion-employees-list',
  templateUrl: './gestion-employees-list.component.html',
  styleUrls: ['./gestion-employees-list.component.css']
})
export class GestionEmployeesListComponent implements OnInit {

  constructor(private  employeeService : EmployeeServiceService) { }

  public employeeInfo : EmployeeVo = new EmployeeVo() ;
  ngOnInit() {
    this.employeeService.findAllEmployesExist();

  }

  public  get allEmployes(){
    return this.employeeService.allEmployees;
  }


  public deleteEmployee(){
    this.employeeService.deleteEmployee(this.employeeInfo.matricule)
  }

  public ShowEmployeeInfo(employee) {
    this.employeeInfo = employee;
  }
public Revert(matricule:string){
    this.employeeService.revert(matricule)

}
  public updateEmployee(){
    this.employeeService.updateEmployee(this.newEmpl)
  }

  public get newEmployee(){
    return this.employeeInfo;
  }
  selectPerEmployee() {
    if ($("#inlineCheckboxperyear2").is (':checked')) {
      this.employeeService.findAllEmployeNotExist();
    } else{
      this.employeeService.findAllEmployesExist();

    }
  }

  public get newEmpl(){
    return this.employeeService.newEmployee
  }

  public findEmployeeById(id:number){
    this.employeeService.findEmployeeyId(id);
  }
}
