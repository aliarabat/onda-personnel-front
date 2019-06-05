import {Component, OnInit} from '@angular/core';
import {MonthUtil} from '../../../util/month-util';
import * as $ from 'jquery';
import {WorkService} from '../../../controller/service/work.service';
import {EquipementService} from '../../../controller/service/equipement.service';
import {InterventionMonthService} from '../../../controller/service/intervention-month.service';
import {EquipementVo} from '../../../controller/model/equipement';
import {TimingVo} from '../../../controller/model/timing.model';
import {TypeVo} from '../../../controller/model/type';
import Swal from "sweetalert2";
import {DateUtil} from '../../../util/date-util';
import {MiddleWare} from "../../../util/middle-ware";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-anomaly-list',
  templateUrl: './gestion-anomaly-list.component.html',
  styleUrls: ['./gestion-anomaly-list.component.css']
})
export class GestionAnomalyListComponent implements OnInit {

  constructor(private workService: WorkService, private equipementService: EquipementService, private interventionMonthService: InterventionMonthService, private router: Router) {
  }

  private equipement: EquipementVo = new EquipementVo(0, '', new TimingVo(), new TypeVo());

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router))
      this.equipementService.findAllEquipements();
  }

  public get allEquipements() {
    return this.equipementService.allEquipements;
  }

  public getMonths() {
    return MonthUtil.months;
  }

  private hiddenStateInterventionMonth: boolean = true;
  private hiddenStateEquipement: boolean = true;

  selectPerYearIntervention() {
    this.hiddenStateEquipement = !$("#inlineCheckboxperyearIntervention").is(':checked');
  }

  selectPerMonthIntervention() {
    this.hiddenStateInterventionMonth = !$("#inlineCheckboxpermonthIntervention").is(':checked');
  }


  findInterventionsByYear() {
    if (this.dateByYear.year === undefined || this.dateByYear.year === null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...!',
        text: 'Merci de saisir l\'année'
      });
    } else {
      if ($('#equipementDiv').is(':visible') || $('#monthIntervDiv').is(':visible')) {
        if ($('#equipementDiv').is(':visible')) {
          if (this.equipement.name === undefined || this.equipement.name === '') {
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de choisir l\'équipement'
            });
          } else {
            if ($('#monthIntervDiv').is(':visible')) {
              if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...!',
                  text: 'Merci de saisir le mois'
                });
              } else {
                this.interventionMonthService.findInterventionMonthByEquipementAndMonthAndYear(this.equipement.name);
              }
            } else {
              this.interventionMonthService.findInterventionMonthByYear(this.equipement.name);
            }
          }
          return;
        }
        if ($('#monthIntervDiv').is(':visible')) {
          if (this.dateByYear.month === undefined || this.dateByYear.month === null) {
            Swal.fire({
              type: 'error',
              title: 'Oops...!',
              text: 'Merci de saisir le mois'
            });
          } else {
            this.interventionMonthService.findInterventionMonthByMonth();
          }
        }

      } else {
        this.interventionMonthService.findInterventionMonthByYear();
      }
    }
  }

  get listInterventionsByYear() {
    return this.interventionMonthService.listEquipementssByYear;
  }

  formatDate(workDetailDate: string) {
    return DateUtil.formatDate(workDetailDate);
  }

  date() {
    return new Date().getFullYear();
  }

  get dateByYear() {
    return this.interventionMonthService.dateByAnnee;
  }

  public getMonth(index: number) {
    return MonthUtil.getMonth(index);
  }

  findById(id: number) {
    this.interventionMonthService.findInterventionMonthById(id);
  }

  public get listInterventionsDay() {
    return this.interventionMonthService.listInterventionsByDay;
  }

  public toDate(ldt: string) {
    let newDate = new Date(ldt);
    return newDate
  }
}
