import {Component, OnInit} from '@angular/core';
import {SkipService} from '../../../controller/service/skip.service';
import {MissionService} from '../../../controller/service/mission.service';

@Component({
  selector: 'app-skip-create',
  templateUrl: './skip-create.component.html',
  styleUrls: ['./skip-create.component.css']
})
export class SkipCreateComponent implements OnInit {

  constructor(public skipService: SkipService,private  missionService:MissionService) {
  }

  ngOnInit() {
    this.skipService.findAllEmployees();
    this.skipService.findAllDetails();
  }
  public get employeeVo(){
    return this.skipService.employees;
  }
  get detailVo(){
    return this.skipService.details;
  }
  public get detail(){
    return this.skipService.detail;
  }
  public get employee(){
    return this.skipService.employee;
  }
  public get skip(){
    return this.skipService.skipCreate
  }
  getSkipedEmployeeByMatricule(){
    this.skipService.findSkipedEmployesByMatricule(this.skipService.employee.matricule);
  }
  public saveSkip(){
     this.skipService.saveSkip()
  }
  getTheDay(){
    this.missionService.findDayDetailsOfDay(this.skipService.employee.matricule,this.skipService.skipCreate.skipDate);

  }
  public get dayDetails(){
    return this.missionService.dayDetails;
  }
  findDetailByWording(){
    this.skipService.findDetailByWording(this.skipService.skipCreate.detailVo.wording);
  }
  formInit(){
  this.skipService.formInit();
  }
}
