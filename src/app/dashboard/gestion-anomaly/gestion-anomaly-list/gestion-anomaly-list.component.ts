import { Component, OnInit } from '@angular/core';
import {MonthUtil} from '../../../util/month-util';
import * as $ from 'jquery';

@Component({
  selector: 'app-gestion-anomaly-list',
  templateUrl: './gestion-anomaly-list.component.html',
  styleUrls: ['./gestion-anomaly-list.component.css']
})
export class GestionAnomalyListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public getMonths(){
    return MonthUtil.months;
  }
  private hiddenStateInterventionMonth: boolean = true;
  private hiddenStateEquipement: boolean = true;
  selectPerYearIntervention() {
    this.hiddenStateEquipement = !$("#inlineCheckboxperyearIntervention").is(':checked');
  }
  selectPerMonthIntervention() {
    this.hiddenStateInterventionMonth= !$("#inlineCheckboxpermonthIntervention").is(':checked');
  }
}
