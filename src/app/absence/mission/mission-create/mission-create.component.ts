import {Component, OnInit} from '@angular/core';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {MissionService} from '../../../controller/service/mission.service';
import {DetailVo} from '../../../controller/model/detail.model';
import {EmployeeVo} from '../../../controller/model/employee.model';
import Swal from "sweetalert2";
import {MissionVo} from '../../../controller/model/mission.model';
import {ReplacementService} from '../../../controller/service/replacement.service';
import {SkipService} from '../../../controller/service/skip.service';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.css']
})
export class MissionCreateComponent implements OnInit {

  constructor(private dayService:DayServiceService,private missionService:MissionService,private remplacementService:ReplacementService,private skipService:SkipService) {
  }

  ngOnInit() {
    this.dayService.findAllDetails();
    this.dayService.findAllEmployees();
    this.dayService.detail=new DetailVo();
    this.dayService.employee=new EmployeeVo();
    this.missionService.mission=new MissionVo();
    this.remplacementService.deleteAllDayDetailsWhereIsNull();
    this.skipService.findAllDetails();


  }

  public get employee(){
    return this.dayService.employee;
  }

  public get employeeVo(){
    return this.dayService.employeeVo;
  }
  get detailVo(){
    return this.dayService.detailVo;
  }
  get allDetails(){
    return this.skipService.details;
  }
  public get detail(){
    return this.dayService.detail;
  }

  public get mission(){
    return this.missionService.mission;
  }
  public get theEmployee(){
    return this.missionService.theEmployee;
  }
  getEmployeeByMatricule(){
    this.missionService.findEmployesByMatricule(this.dayService.employee.matricule);
  }

  public saveMission(){
    console.log(this.missionService.mission);
    this.missionService.SaveMission(this.missionService.mission,this.dayService.employee.matricule,this.missionService.mission.detailVo.wording);
    this.dayService.detail=new DetailVo();
    this.dayService.employee=new EmployeeVo();
    this.missionService.theEmployee=new EmployeeVo();
    this.missionService.mission=new MissionVo(0,'',this.missionService.theEmployee,'','',new DetailVo());
  }
initForm(){
  this.dayService.detail=new DetailVo();
  this.dayService.employee=new EmployeeVo();
    this.missionService.formInit();
  }

  getTheDay(){
    this.missionService.findDayDetailsOfDay(this.missionService.theEmployee.matricule,this.missionService.mission.startingDate);

  }
  public get dayDetails(){
    return this.missionService.dayDetails;
  }

  findDetailByWording(){
    this.missionService.findDetailByWording(this.missionService.mission.detailVo.wording);
  }

}
