import {Component, OnInit} from '@angular/core';
import {DayServiceService} from '../../../controller/service/day-service.service';
import {ReplacementService} from '../../../controller/service/replacement.service';
import {MissionService} from '../../../controller/service/mission.service';
import {DayDetailVo} from '../../../controller/model/day-detail.model';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import {DateUtil} from '../../../util/date-util';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-replacement-list',
  templateUrl: './replacement-list.component.html',
  styleUrls: ['./replacement-list.component.css']
})
export class ReplacementListComponent implements OnInit {

  constructor(private dayService: DayServiceService, private remplacementService: ReplacementService, private  missionService: MissionService, private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.remplacementService.findAlldayDetailsReplacement();
    }
  }

  public get listDayDetailsReplacement() {
    return this.remplacementService.dayDetailsRemp;
  }

  deleteReplacement(dayDetail: DayDetailVo) {
    return this.remplacementService.deleteReplacement(dayDetail);
  }

  formatDate(date: string) {
    return DateUtil.formatDate(date).toLocaleDateString();
  }

}
