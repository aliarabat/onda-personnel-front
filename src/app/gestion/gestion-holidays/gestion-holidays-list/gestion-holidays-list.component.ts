import {Component, OnInit} from '@angular/core';
import {HolidayService} from '../../../controller/service/holiday.service';
import {HolidayVo} from '../../../controller/model/holiday.model';
import {DateUtil} from '../../../util/date-util';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-holidays-list',
  templateUrl: './gestion-holidays-list.component.html',
  styleUrls: ['./gestion-holidays-list.component.css']
})
export class GestionHolidaysListComponent implements OnInit {
  public selectedHoliday: HolidayVo = new HolidayVo(0, '', '', '');


  constructor(public holidayService: HolidayService, public router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router)) {
      this.holidayService.findAll();
    }
  }

  get holidayList() {
    return this.holidayService.holidaysList;
  }

  setSelectedHoliday(hol: HolidayVo) {
    this.selectedHoliday = hol;
  }

  get holidayVoToUpdate() {
    return this.holidayService.holidayVoToUpdate;
  }

  update() {
    this.holidayService.updateHoliday(this.selectedHoliday);
  }

  deleteHoliday(id: number) {
    this.holidayService.deleteHoliday(id);
  }

  formatDate(workDetailDate: string) {
    return DateUtil.formatDate(workDetailDate);
  }
}
