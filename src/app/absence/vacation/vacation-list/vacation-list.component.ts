import {Component, OnInit} from '@angular/core';
import {VacationService} from '../../../controller/service/vacation.service';
import {VacationVo} from '../../../controller/model/vacation.model';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {
  public vacationInfo : VacationVo = new VacationVo(0,new EmployeeVo(),'','','','');

  constructor(public vacationService: VacationService, private router:Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.vacationService.findAllVacations();
  }

  public get vacations() {
    return this.vacationService.vacations;
  }

  public ShowDetailInfo(vacation){
    this.vacationInfo = vacation;
  }
  public deleteVacation(){
    this.vacationService.deleteVaction(this.vacationInfo.id)
  }
  public get newVacation(){
    return this.vacationService.newVacation;
  }

  public updateVacation(){
    this.vacationService.updateEmployee(this.newVacation,this.newVacation.employeeVo.matricule)
  }

  public get employee(){
    return this.vacationService.employee;
  }

  public get employeeVo(){
    return this.vacationService.employeeVo;
  }

  public findVacationById(id : number){
    this.vacationService.findVacationById(id);
  }
}
