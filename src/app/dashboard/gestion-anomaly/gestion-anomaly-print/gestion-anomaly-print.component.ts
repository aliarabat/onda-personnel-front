import { Component, OnInit } from '@angular/core';
import {MonthUtil} from '../../../util/month-util';

@Component({
  selector: 'app-gestion-anomaly-print',
  templateUrl: './gestion-anomaly-print.component.html',
  styleUrls: ['./gestion-anomaly-print.component.css']
})
export class GestionAnomalyPrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  months(){
    return MonthUtil.months;
  }
}
