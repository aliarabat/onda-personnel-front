import {Component, OnInit} from '@angular/core';
import {DetailServiceService} from '../../../controller/service/detail-service.service';
import {DetailVo} from '../../../controller/model/detail.model';
import {DateUtil} from "../../../util/date-util";
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-gestion-timing-list',
  templateUrl: './gestion-timing-list.component.html',
  styleUrls: ['./gestion-timing-list.component.css']
})
export class GestionTimingListComponent implements OnInit {
  public detailInfo: DetailVo = new DetailVo();

  constructor(public detailService: DetailServiceService, private router:Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.detailService.findAllDetails()
  }

  public get allDetails() {
    return this.detailService.allDetails
  }

  public ShowDetailInfo(detail) {
    this.detailInfo = detail;
  }

  public updateDetail() {
    this.detailService.updateDetail(this.newDet)
  }

  public get newDetail() {
    return this.detailInfo;
  }

  public deleteDetail() {
    this.detailService.deleteDetail(this.detailInfo.wording)
  }

  public get newDet() {
    return this.detailService.newDetail;
  }

  public findById(id: number) {
    this.detailService.findDetailById(id)
  }

  horaire(hour: string, minute: string) {
    return DateUtil.horaire(hour, minute);
  }
}
