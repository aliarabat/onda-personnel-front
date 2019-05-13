import {Component, OnInit} from '@angular/core';
import {SkipService} from '../../../controller/service/skip.service';

@Component({
  selector: 'app-skip-create',
  templateUrl: './skip-create.component.html',
  styleUrls: ['./skip-create.component.css']
})
export class SkipCreateComponent implements OnInit {

  constructor(public skipService: SkipService) {
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

  public saveSkip(){
     this.skipService.saveSkip()
  }
}
