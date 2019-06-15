import { Component, OnInit } from '@angular/core';
import { DayServiceService } from "../../../controller/service/day-service.service";
import { EmployeeVo } from "../../../controller/model/employee.model";
import { DayVo } from "../../../controller/model/day.model";
import { DayDetailVo } from "../../../controller/model/day-detail.model";
import { MonthUtil } from "../../../util/month-util";
import { DetailVo } from '../../../controller/model/detail.model';
import { DateUtil } from "../../../util/date-util";
import { Router } from '@angular/router';
import { MiddleWare } from '../../../util/middle-ware';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-services-create',
  templateUrl: './gestion-services-create.component.html',
  styleUrls: ['./gestion-services-create.component.css']
})
export class GestionServicesCreateComponent implements OnInit {

  constructor(private dayService: DayServiceService, private router: Router) {
  }

  private selectedEmployee: EmployeeVo;

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.dayService.findAllEmployees();
      this.dayService.findAllDetails();
    }
  }

  get listDate() {
    return this.dayService.listDate;
  }

  public get employeeVo() {
    return this.dayService.employeeVo;
  }

  get detailVo() {
    return this.dayService.detailVo;
  }

  public get employee() {
    return this.dayService.employee;
  }

  public get days() {
    return this.dayService.days;
  }

  public get dayDetail() {
    return this.dayService.dayDetail;
  }

  public ajouter() {
    this.dayService.ajouter();
  }

  setSelectedEmployee(emp: EmployeeVo) {
    this.selectedEmployee = emp;
  }

  get day() {
    return this.dayService.day;
  }

  addDetailToBadges() {
    this.dayService.addDetailToBadges();
  }

  get detail() {
    return this.dayService.detail;
  }

  initializeList() {
    this.dayService.initializeList();
  }

  deleteDay(day: DayVo) {
    this.dayService.deleteDay(day);
  }

  async confirm() {
    await this.dayService.confirm();
  }

  checkDates() {
    this.dayService.checkDates();
  }

  initForm() {
    this.dayService.employee = new EmployeeVo();
    this.dayService.detail = new DetailVo();
    this.dayService.day = new DayVo();
    this.dayService.listDate = [];
    this.dayService.days = [];
  }

  substructDetail(dd: DayDetailVo) {
    this.dayService.substructDetail(dd);
  }

  getDay(index: number) {
    return MonthUtil.day(index);
  }

  ramadanHours() {
    if ($("#inlineCheckboxHoraireRamadan").prop("checked")) {
      this.dayService.details = this.dayService.detailsHelper.filter(dt => dt.mode === 'Ramadan' || dt.wording === 'R');
    } else {
      this.dayService.details = this.dayService.detailsHelper.filter(dt => dt.mode === 'Normal' || dt.wording === 'R');
    }
  }

  horaire(hour: string, minute: string) {
    return DateUtil.horaire(hour, minute);
  }
}
