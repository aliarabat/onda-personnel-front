import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../../../controller/service/employee-service.service';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {VacationService} from '../../../controller/service/vacation.service';

@Component({
  selector: 'app-vacation-create',
  templateUrl: './vacation-create.component.html',
  styleUrls: ['./vacation-create.component.css']
})
export class VacationCreateComponent implements OnInit {

  constructor( private  vacationService : VacationService) {
  }


  ngOnInit() {
    this.vacationService.findAllEmployees();
  }


  public get vacation(){
    return this.vacationService.vacationCreate
  }

  public  saveVacation(){
    this.vacationService.saveVacation();
  }
  public get employeeVo(){
    return this.vacationService.employeeVo;
  }

  public get employee(){
    return this.vacationService.employee;
  }

  public test(emp:EmployeeVo){
    console.log(emp)
  }


}
