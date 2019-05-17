import { Component, OnInit } from '@angular/core';
import {WorkService} from '../../../controller/service/work.service';
import {MonthUtil} from '../../../util/month-util';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-gestion-services-print',
  templateUrl: './gestion-services-print.component.html',
  styleUrls: ['./gestion-services-print.component.css']
})
export class GestionServicesPrintComponent implements OnInit {

  constructor(private workService:WorkService, private router:Router) { }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

  get dateToPrint(){
    return this.workService.dateForPrinting;
  }
  get worksToPrint(){
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

  months(){
    return MonthUtil.months;
  }

  public getMonth(index:number){
    return MonthUtil.getMonth(index);
  }
}
