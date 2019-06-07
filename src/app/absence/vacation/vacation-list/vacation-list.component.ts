import {Component, OnInit} from '@angular/core';
import {VacationService} from '../../../controller/service/vacation.service';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {

  constructor(public vacationService: VacationService, private router: Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.vacationService.findAllVacations();
  }

  public get vacations() {
    return this.vacationService.vacations;
  }

  public deleteVacation(id: number) {
    this.vacationService.deleteVaction(id);
  }

  public get newVacation() {
    return this.vacationService.newVacation;
  }

  public updateVacation() {
    this.vacationService.updateEmployee(this.newVacation, this.newVacation.employeeVo.matricule)
  }

  public get employee() {
    return this.vacationService.employee;
  }

  public get employeeVo() {
    return this.vacationService.employeeVo;
  }

  public findVacationById(id: number) {
    this.vacationService.findVacationById(id);
  }
}
