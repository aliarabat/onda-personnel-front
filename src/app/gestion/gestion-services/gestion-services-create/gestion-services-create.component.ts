import { Component, OnInit } from '@angular/core';
import {DayServiceService} from "../../../controller/service/day-service.service";
import {EmployeeVo} from "../../../controller/model/employee.model";
import {DayVo} from "../../../controller/model/day.model";
import {DayDetailVo} from "../../../controller/model/day-detail.model";

@Component({
  selector: 'app-gestion-services-create',
  templateUrl: './gestion-services-create.component.html',
  styleUrls: ['./gestion-services-create.component.css']
})
export class GestionServicesCreateComponent implements OnInit {

  constructor(private dayService:DayServiceService) {  }

  private selectedEmployee:EmployeeVo;

  ngOnInit() {
    this.dayService.findAllEmployees();
    this.dayService.findAllDetails();
  }

  get listDate(){
    return this.dayService.listDate;
  }

  public get employeeVo(){
    return this.dayService.employeeVo;
  }
  get detailVo(){
    return this.dayService.detailVo;
  }
  public get employee(){
    return this.dayService.employee;
  }

  public get days(){
    return this.dayService.days;
  }

  public get dayDetail(){
    return this.dayService.dayDetail;
  }

  public ajouter() {
    this.dayService.ajouter();
  }

  setSelectedEmployee(emp:EmployeeVo) {
    this.selectedEmployee=emp;
  }

  public get day(){
    return this.dayService.day;
  }

  addDetailToBadges() {
    this.dayService.addDetailToBadges();
  }

  public get detail(){
    return this.dayService.detail;
  }
  public get detailClone(){
    return this.dayService.day.dayDetailsVo;
  }

  initializeList() {
    this.dayService.initializeList();
  }

  deleteDay(day: DayVo) {
    this.dayService.deleteDay(day);
  }

  confirm() {
    this.dayService.confirm();
  }

  checkDates(){
    this.dayService.checkDates();
  }

  reinitializeForm() {
    this.dayService.reinitializeForm();
  }

  substructDetail(dd: DayDetailVo) {
    this.dayService.substructDetail(dd);
  }
}
