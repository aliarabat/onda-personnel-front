import { Component, OnInit } from '@angular/core';
import {HolidayService} from '../../../controller/service/holiday.service';
import {HolidayVo} from '../../../controller/model/holiday.model';
import {DateUtil} from '../../../util/date-util';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-holidays-create',
  templateUrl: './gestion-holidays-create.component.html',
  styleUrls: ['./gestion-holidays-create.component.css']
})
export class GestionHolidaysCreateComponent implements OnInit {

  constructor(private holidayService: HolidayService, private router: Router) { }

  async ngOnInit() {
    await MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsAdmin(this.router);
  }

  get holidayCreate() {
    return this.holidayService.holidayCreate;
  }

  get holidaysVo() {
    return this.holidayService.holidaysVo;
  }

  addHoliday() {
    this.holidayService.addHoliday();
  }

  reinitializeForm() {
    this.holidayService.reinitializeForm();
  }

  substructHoliday(h: HolidayVo) {
    this.holidayService.substructHoliday(h);
  }

  confirm() {
    this.holidayService.confirm();
  }

  reinitializeList() {
    this.holidayService.reinitializeList();
  }

  formatDate(workDetailDate: string) {
    return DateUtil.formatDate(workDetailDate);
  }
}
