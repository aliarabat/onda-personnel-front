import { Component, OnInit } from '@angular/core';
import {MonthUtil} from '../../../util/month-util';
import {InterventionMonthService} from "../../../controller/service/intervention-month.service";
import {DateUtil} from "../../../util/date-util";

@Component({
  selector: 'app-gestion-anomaly-print',
  templateUrl: './gestion-anomaly-print.component.html',
  styleUrls: ['./gestion-anomaly-print.component.css']
})
export class GestionAnomalyPrintComponent implements OnInit {

  constructor(private interventionMonthService:InterventionMonthService) { }

  ngOnInit() {
  }

  get dateToPrint(){
    return this.interventionMonthService.dateForPrinting;
  }
  months(){
    return MonthUtil.months;
  }

  searchInterventionMonthToPrint() {
    this.interventionMonthService.searchInterventionMonthToPrint();
  }

  get interventionToPrint(){
    return this.interventionMonthService.interventionMonthVoSearch;
  }

  formatDate(dateIntervention: string) {
    return DateUtil.formatDate(dateIntervention);
  }

  getMonth(month: number) {
    return MonthUtil.getMonth(month);
  }

  print(fullYear: number, month: number) {
    return this.interventionMonthService.print(fullYear,month);
  }
}
