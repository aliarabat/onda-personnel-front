import {Component, OnInit} from '@angular/core';
import {WorkServiceService} from "../../../controller/service/work-service.service";
import {WorkDatailVo} from "../../../controller/model/work-datail.model";
import * as $ from 'jquery';
import {EmployeeVo} from "../../../controller/model/employee.model";
import {DayServiceService} from "../../../controller/service/day-service.service";
import Swal from "sweetalert2";
import {WorkVo} from "../../../controller/model/work.model";
import {DayVo} from "../../../controller/model/day.model";

// @ts-ignore
@Component({
  selector: 'app-gestion-services-list',
  templateUrl: './gestion-service-list.component.html',
  styleUrls: ['./gestion-service-list.component.css']
})

export class GestionServiceListComponent implements OnInit {
  private selectedDaysFormModal: Array<DayVo> = [];
  private hiddenStateMonth: boolean = true;

  constructor(private workService: WorkServiceService, private dayService: DayServiceService) {
  }

  private hiddenState: boolean = true;
  private selectdedWork: WorkDatailVo = new WorkDatailVo(0, '', '', {hour: "0", minute: "0"}, {hour: "0", minute: "0"});
  private employee: EmployeeVo = new EmployeeVo(0, '');

  ngOnInit() {
  }


  get employeeVo() {
    return this.dayService.employeeVo;
  }

  get dateByYear() {
    return this.workService.dateByAnnee;
  }

  findWorkByYear() {
    if (this.dateByYear.year === undefined||this.dateByYear.year ===null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...!',
        text: 'Merci de saisir l\'année'
      })
    } else {
      if ($("#employeeDiv").is(':visible') || $("#monthDiv").is(':visible')) {
        if ($("#employeeDiv").is(':visible')) {
          if (this.employee.matricule === undefined || this.employee.matricule === '') {
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de choisir l\'employé'
            });
          } else {
            if ($("#monthDiv").is(':visible')) {
              if (this.dateByYear.month===undefined||this.dateByYear.month===null){
              } else{
                this.workService.findWorkByEmployeeAndMonthAndYear(this.employee.matricule);
                this.employee=new EmployeeVo();
              }
            } else {
              this.workService.findWorkByYear(this.employee.matricule);
              this.employee=new EmployeeVo();
            }
          }
          return;
        }
        if ($("#monthDiv").is(':visible')) {
          if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de saisir le mois'
            });
          }else{
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
    return new Date(workDetailDate);
  }

  get workDetailVoToUpdate(): WorkDatailVo {
    return this.workService.workDetailVoToUpdate;
  }

  setSelectedWork(w: WorkDatailVo) {
    this.selectdedWork = w;
  }

  update() {
    this.workService.updateWorkDetail(this.selectdedWork);
  }

  selectPerYear() {
    this.hiddenState = !$("#inlineCheckboxperyear").is(':checked');
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
    this.hiddenStateMonth = !$("#inlineCheckboxpermonth").is(':checked');
  }
}
