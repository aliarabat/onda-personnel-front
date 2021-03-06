import {Component, OnInit} from '@angular/core';
import {SkipService} from '../../../controller/service/skip.service';
import {DayDetailVo} from '../../../controller/model/day-detail.model';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import {DateUtil} from '../../../util/date-util';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-skip-list',
  templateUrl: './skip-list.component.html',
  styleUrls: ['./skip-list.component.css']
})
export class SkipListComponent implements OnInit {

  constructor(public skipService: SkipService, private dayService: DayServiceService, private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.skipService.findAllSkips();
      this.dayService.findAllDetails();
    }
  }

  public get dayDetails() {
    return this.skipService.dayDetails;
  }

  findDayDetailById(id: number) {
    this.skipService.findDayDetailById(id);
  }

  public deleteSkip(id: number) {
    this.skipService.deleteSkip(id);
  }

  public get selectedDayDetail() {
    return this.skipService.selectedDayDetail;
  }

  get detailVo() {
    return this.dayService.detailVo;
  }

  findDetailByWording() {
    this.skipService.findDetailByWording(this.skipService.selectedDayDetail.skipVo.detailVo.wording);
  }

  updateSkip(daydetail: DayDetailVo) {
    this.skipService.updateSkip(daydetail);
  }

  formatDate(date: string) {
    return DateUtil.formatDate(date).toLocaleDateString();
  }
}
