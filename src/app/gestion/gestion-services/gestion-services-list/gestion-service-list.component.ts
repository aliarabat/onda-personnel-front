import {Component, OnInit} from '@angular/core';
import {WorkService} from '../../../controller/service/work.service';
import * as $ from 'jquery';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {DayServiceService} from '../../../controller/service/day-service.service';
import Swal from 'sweetalert2';
import {DayVo} from '../../../controller/model/day.model';
import {MonthUtil} from '../../../util/month-util';
import {DateUtil} from '../../../util/date-util';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import {SwalUtil} from '../../../util/swal-util';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-services-list',
  templateUrl: './gestion-service-list.component.html',
  styleUrls: ['./gestion-service-list.component.css']
})

export class GestionServiceListComponent implements OnInit {
  public selectedDaysFormModal: Array<DayVo> = [];
  public hiddenStateMonth = true;

  constructor(public workService: WorkService, public dayService: DayServiceService, public router: Router) {
  }

  public hiddenState = true;
  public employee: EmployeeVo = new EmployeeVo(0, '');

  async ngOnInit() {
    await MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router);
  }


  get employeeVo() {
    return this.dayService.employeeVo;
  }

  get dateByYear() {
    return this.workService.dateByAnnee;
  }

  findWorkByYear() {
    if (this.dateByYear.year === undefined || this.dateByYear.year === null) {
      SwalUtil.insert('l\'année');
    } else {
      if ($('#employeeDiv').is(':visible') || $('#monthDiv').is(':visible')) {
        if ($('#employeeDiv').is(':visible')) {
          if (this.employee.matricule === undefined || this.employee.matricule === '') {
            SwalUtil.select('l\'employé');
          } else {
            if ($('#monthDiv').is(':visible')) {
              if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
                SwalUtil.select('le mois');
              } else {
                this.workService.findWorkByEmployeeAndMonthAndYear(this.employee.matricule);
              }
            } else {
              this.workService.findWorkByYear(this.employee.matricule);
            }
          }
          return;
        }
        if ($('#monthDiv').is(':visible')) {
          if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
            SwalUtil.select('le mois');
          } else {
            this.workService.findWorksByMonth();
          }
        }
      } else {
        this.workService.findWorkByYear();
      }
    }
  }

  get listEmployeesByYear() {
    return this.workService.listEmployeesByYear;
  }

  date() {
    return new Date().getFullYear();
  }

  formatDate(workDetailDate: string) {
    return DateUtil.formatDate(workDetailDate);
  }

  selectPerYear() {
    this.hiddenState = !$('#inlineCheckboxperyear').is(':checked');
  }

  reinitializeForm() {
    this.employee = new EmployeeVo(0, '');
    this.workService.reinitializeSearchByYearForm();
  }

  setDaysInfo(w: Array<DayVo>) {
    this.selectedDaysFormModal = w.sort((a, b) => {
      return a.id - b.id;
    });
  }

  selectPerMonth() {
    this.hiddenStateMonth = !$('#inlineCheckboxpermonth').is(':checked');
  }

  public getMonths() {
    return MonthUtil.months;
  }

  public getMonth(index: number) {
    return MonthUtil.getMonth(index);
  }
}
