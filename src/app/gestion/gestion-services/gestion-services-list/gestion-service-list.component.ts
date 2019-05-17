import {Component, OnInit} from '@angular/core';
import {WorkService} from '../../../controller/service/work.service';
import * as $ from 'jquery';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {DayServiceService} from '../../../controller/service/day-service.service';
import Swal from 'sweetalert2';
import {DayVo} from '../../../controller/model/day.model';
import {MonthUtil} from '../../../util/month-util';
import {DetailVo} from '../../../controller/model/detail.model';
import {DateUtil} from '../../../util/date-util';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

;

// @ts-ignore
@Component({
  selector: 'app-gestion-services-list',
  templateUrl: './gestion-service-list.component.html',
  styleUrls: ['./gestion-service-list.component.css']
})

export class GestionServiceListComponent implements OnInit {
  private selectedDaysFormModal: Array<DayVo> = [];
  private hiddenStateMonth: boolean = true;

  constructor(private workService: WorkService, private dayService: DayServiceService, private router:Router) {
  }

  private hiddenState: boolean = true;
  private employee: EmployeeVo = new EmployeeVo(0, '');

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.dayService.detail = new DetailVo();
    this.dayService.employee = new EmployeeVo();
  }


  get employeeVo() {
    return this.dayService.employeeVo;
  }

  get dateByYear() {
    return this.workService.dateByAnnee;
  }

  findWorkByYear() {
    if (this.dateByYear.year === undefined || this.dateByYear.year === null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...!',
        text: 'Merci de saisir l\'année'
      });
    } else {
      if ($('#employeeDiv').is(':visible') || $('#monthDiv').is(':visible')) {
        if ($('#employeeDiv').is(':visible')) {
          if (this.employee.matricule === undefined || this.employee.matricule === '') {
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de choisir l\'employé'
            });
          } else {
            if ($('#monthDiv').is(':visible')) {
              if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...!',
                  text: 'Merci de saisir le mois'
                });
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
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de saisir le mois'
            });
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

  get listEmployeesByYearUntouched() {
    return this.workService.listEmployeesByYearUntouched;
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
