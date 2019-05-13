import {Component, OnInit} from '@angular/core';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {ReplacementService} from '../../../controller/service/replacement.service';
import {MissionService} from '../../../controller/service/mission.service';

@Component({
  selector: 'app-replacement-create',
  templateUrl: './replacement-create.component.html',
  styleUrls: ['./replacement-create.component.css']
})
export class ReplacementCreateComponent implements OnInit {

  constructor(private dayService:DayServiceService,private remplacementService:ReplacementService,private  missionService:MissionService) {
  }

  ngOnInit() {
    this.dayService.findAllEmployees();
    this.remplacementService.deleteAllDayDetailsWhereIsNull();

  }
  public get employeeVo(){
    return this.dayService.employeeVo;
  }
  public get orgEmployee(){
    return this.remplacementService.orgEmployee;
  }
  public get rempEmployee(){
    return this.remplacementService.rempEmployee;
  }

  getEmployeeByMatricule(){
    this.remplacementService.findEmployesByMatricule(this.remplacementService.orgEmployee.matricule);
  }
  getReplacedEmployeeByMatricule(){
    this.remplacementService.findReplacedEmployesByMatricule(this.remplacementService.rempEmployee.matricule);
  }

  getTheDay(){
    this.missionService.findDayDetailsOfDay(this.remplacementService.orgEmployee.matricule,this.replacement.replacementDate);

  }
  public get replacement(){
    return this.remplacementService.replacement;
  }
  public get dayDetails(){
    return this.missionService.dayDetails;
  }
  findDetailByWording(){
    this.remplacementService.findDetailByWording(this.remplacementService.replacement.detailVo.wording);
  }
  saveReplacement(){
    this.remplacementService.saveReplacement(this.remplacementService.replacement,this.remplacementService.orgEmployee.matricule,this.remplacementService.rempEmployee.matricule,this.remplacementService.replacement.detailVo.wording);
  }
}
