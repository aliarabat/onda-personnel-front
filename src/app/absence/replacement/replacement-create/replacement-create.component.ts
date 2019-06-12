import {Component, OnInit} from '@angular/core';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {ReplacementService} from '../../../controller/service/replacement.service';
import {MissionService} from '../../../controller/service/mission.service';
import {SkipService} from '../../../controller/service/skip.service';
import {MiddleWare} from '../../../util/middle-ware';
import {Router} from '@angular/router';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-replacement-create',
  templateUrl: './replacement-create.component.html',
  styleUrls: ['./replacement-create.component.css']
})
export class ReplacementCreateComponent implements OnInit {

  constructor(private dayService:DayServiceService,private remplacementService:ReplacementService,private  missionService:MissionService,private skipService:SkipService, private router:Router) {
  }
  get allDetails(){
    return this.skipService.details;
  }
  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.dayService.findAllTechEmployees();
      this.remplacementService.deleteAllDayDetailsWhereIsNull();
      this.skipService.findAllDetails();
    }
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
  formInit(){
    this.remplacementService.formInit();
  }
}
