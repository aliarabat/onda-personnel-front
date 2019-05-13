import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../controller/service/mission.service';
import {DayDetailVo} from '../../../controller/model/day-detail.model';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {DetailVo} from '../../../controller/model/detail.model';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {MissionVo} from '../../../controller/model/mission.model';
import {ReplacementService} from '../../../controller/service/replacement.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {

  constructor(private missionService:MissionService,private dayService:DayServiceService,private remplacementService:ReplacementService) {
  }

  ngOnInit() {
    //this.missionService.findAllWorks();
    this.missionService.findAlldayDetails();
    this.dayService.findAllDetails();
    this.dayService.findAllEmployees();
    this.missionService.detail1=new DetailVo();
    this.missionService.employee1=new EmployeeVo();
    this.missionService.mission=new MissionVo();
    this.remplacementService.deleteAllDayDetailsWhereIsNull();


  }
  public get listOfWorks(){
    return this.missionService.works;
  }
  public get listOfDayDetails(){
    return this.missionService.dayDetails1;
  }
  public get mission(){
    return this.missionService.mission;
  }
  delete(dayDetail:DayDetailVo){
    this.missionService.deleteMission(dayDetail);
  }

  getDayDetail(dayDetail:DayDetailVo){
    this.missionService.getTheDayDetail(dayDetail);
  }
  public get theDayDetail(){
    return this.missionService.theDayDetail;
  }
  public get employee1(){
    return this.missionService.employee1;
  }

  public get employeeVo(){
    return this.dayService.employeeVo;
  }
  public get detail1(){
    return this.missionService.detail1;
  }

  findDayDetailById(id:number){
    this.missionService.findDayDetailById(id);
  }
  public get theDayDetail1(){
    return this.missionService.theDayDetail1;
  }
updateMission(daydetail:DayDetailVo){
    this.missionService.updateMission(daydetail);
}
  getTheDay(){
    this.missionService.findDayDetailsOfDay(this.missionService.theDayDetail.missionVo.employee.matricule,this.missionService.theDayDetail.missionVo.startingDate);

  }
  public get dayDetails(){
    return this.missionService.dayDetails;
  }

  get detailVo(){
    return this.dayService.detailVo;
  }
  findDetailByWording(){
    this.missionService.findDetailByWording(this.missionService.theDayDetail.missionVo.detailVo.wording);
  }
  getEmployeeByMatricule(){
    this.missionService.findEmployesByMatricule(this.missionService.theDayDetail.missionVo.employee.matricule);
  }

}
