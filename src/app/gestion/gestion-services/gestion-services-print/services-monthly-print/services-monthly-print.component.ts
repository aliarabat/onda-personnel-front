import {Component, OnInit} from '@angular/core';
import {WorkService} from "../../../../controller/service/work.service";
import {Router} from "@angular/router";
import {MiddleWare} from "../../../../util/middle-ware";
import {MonthUtil} from "../../../../util/month-util";

@Component({
  selector: 'app-services-monthly-print',
  templateUrl: './services-monthly-print.component.html',
  styleUrls: ['./services-monthly-print.component.css']
})
export class ServicesMonthlyPrintComponent implements OnInit {

  constructor(private workService: WorkService, private router: Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

  get dateToPrint() {
    return this.workService.dateForPrinting;
  }

  get worksToPrint() {
    return this.workService.workVoSearch;
  }

  searchWorkToPrint() {
    this.workService.searchWorkToPrint();
  }

  formatDate(workDetailDate: string) {
    return new Date(workDetailDate);
  }

  print(fullYear: number, month: number) {
    this.workService.print(fullYear, month);
  }

  months() {
    return MonthUtil.months;
  }

  public getMonth(index: number) {
    return MonthUtil.getMonth(index);
  }

}
