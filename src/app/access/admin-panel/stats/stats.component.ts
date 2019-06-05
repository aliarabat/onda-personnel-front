import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from "../../../controller/service/employee-service.service";
import {ChartUtil, doubleChart} from "../../../util/chart-util";
import {HolidayService} from "../../../controller/service/holiday.service";
import {DetailServiceService} from "../../../controller/service/detail-service.service";
import {WorkService} from "../../../controller/service/work.service";
import {DateUtil} from "../../../util/date-util";
import {MonthUtil} from "../../../util/month-util";
import {MiddleWare} from "../../../util/middle-ware";
import {Router} from "@angular/router";
import {GrantedAccess} from "../../../util/granted-access";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private _employeeService: EmployeeServiceService, private holidayService: HolidayService, private detailService: DetailServiceService, private workService: WorkService, private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router)) {
      await this.countAllEmployees();
      await this.countHolidaysAndDetails();
      await this.countWorks();
    }
  }

  async countAllEmployees() {
    const dataEmployees = [];
    await this._employeeService.countAllEmployees().subscribe(data => dataEmployees.push(data));

    let ctx = document.getElementById('employees');
    ChartUtil(ctx, ['Employés'], dataEmployees, 'Employés');
  }

  async countHolidaysAndDetails() {
    const labels = ['Jours féries', 'Horaires'];
    const dataSets = [];
    await this.holidayService.countAllHolidays().subscribe(data => dataSets.push(data));
    await this.detailService.countAllHours().subscribe(data => dataSets.push(data));
    let ctx = document.getElementById('holidaysanddetails');
    ChartUtil(ctx, labels, dataSets, 'Horaires et jours féries');

  }

  async countWorks() {
    const labels = [];
    const dataVacation = {
      label: '',
      backgroundColor: "#3e95cd",
      data: []
    };
    const dataReplacement = {
      label: '',
      backgroundColor: "#8e5ea2",
      data: []
    };
    const dataSkip = {
      label: '',
      backgroundColor: "#3cba9f",
      data: []
    };
    const dataMission = {
      label: '',
      backgroundColor: "#c45850",
      data: []
    };
    const dataSets = [];
    dataVacation.label = 'Congés';
    dataReplacement.label = 'Remplacement';
    dataSkip.label = 'Absence';
    dataMission.label = 'Mission';

    this.workService.searchEmployeeSats().toPromise().then(list => {
      list.reverse();
      list.forEach(item => {
        labels.push(MonthUtil.getMonth(DateUtil.formatDate(item.workDetailVo.workDetailDate).getMonth()));
        dataVacation.data.push(item.workDetailVo.vacationNumber);
        dataReplacement.data.push(item.workDetailVo.replacementNumber);
        dataSkip.data.push(item.workDetailVo.skipNumber);
        dataMission.data.push(item.workDetailVo.missionNumber);
      });
      dataSets.push(dataVacation, dataReplacement, dataSkip, dataMission);
    });

    let ctx = document.getElementById('mainSource');
    await doubleChart(ctx, labels, dataSets, 'Gestion des services');

  }

  get employees() {
    return this._employeeService.allEmployees;
  }

  get employee() {
    return this.workService.employeeSearchToStats;
  }

  get yearStats() {
    return this.workService.yearStats;
  }
}
