import {Component, OnInit} from '@angular/core';
import {WorkService} from '../../../../controller/service/work.service';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../../util/middle-ware';
import {MonthUtil} from '../../../../util/month-util';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-services-monthly-print',
  templateUrl: './services-monthly-print.component.html',
  styleUrls: ['./services-monthly-print.component.css']
})
export class ServicesMonthlyPrintComponent implements OnInit {

  constructor(private workService: WorkService, private router: Router) {
  }

  async ngOnInit() {
    await MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router);
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

  async print(fullYear: number, month: number) {
    await this.workService.print(fullYear, month);
  }

  months() {
    return MonthUtil.months;
  }

  public getMonth(index: number) {
    return MonthUtil.getMonth(index);
  }

}
