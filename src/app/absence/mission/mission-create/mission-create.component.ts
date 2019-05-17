import {Component, OnInit} from '@angular/core';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {MissionService} from '../../../controller/service/mission.service';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {MissionVo} from '../../../controller/model/mission.model';
import {ReplacementService} from '../../../controller/service/replacement.service';
import {SkipService} from '../../../controller/service/skip.service';
import {MiddleWare} from '../../../util/middle-ware';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.css']
})
export class MissionCreateComponent implements OnInit {

  constructor(private dayService: DayServiceService, private missionService: MissionService, private remplacementService: ReplacementService, private skipService: SkipService, private router: Router) {
  }

  ngOnInit() {
    // MiddleWare.checkIfUserIsLogged(this.router);
    this.dayService.findAllEmployees();
    this.dayService.employee = new EmployeeVo();
    this.missionService.mission = new MissionVo();
    this.remplacementService.deleteAllDayDetailsWhereIsNull();
  }

  public get employee() {
    return this.dayService.employee;
  }

  public get employeeVo() {
    return this.dayService.employeeVo;
  }


  public get mission() {
    return this.missionService.mission;
  }

  public get theEmployee() {
    return this.missionService.theEmployee;
  }

  getEmployeeByMatricule() {
    this.missionService.findEmployesByMatricule(this.dayService.employee.matricule);
  }

  public saveMission() {
    console.log(this.missionService.mission);
    this.missionService.SaveMission(this.missionService.mission, this.dayService.employee.matricule);
    this.dayService.employee = new EmployeeVo();
    this.missionService.theEmployee = new EmployeeVo();
    this.missionService.mission = new MissionVo();
  }

  initForm() {
    this.dayService.employee = new EmployeeVo();
    this.missionService.formInit();
  }

  getTheDay() {
    this.missionService.findDayDetailsOfDay(this.missionService.theEmployee.matricule, this.missionService.mission.startingDate);

  }


}
