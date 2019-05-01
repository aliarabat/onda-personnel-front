import { Component, OnInit } from '@angular/core';
import {DetailServiceService} from '../../../controller/service/detail-service.service';
import {DetailVo} from '../../../controller/model/detail.model';

@Component({
  selector: 'app-gestion-timing-list',
  templateUrl: './gestion-timing-list.component.html',
  styleUrls: ['./gestion-timing-list.component.css']
})
export class GestionTimingListComponent implements OnInit {
public  detailInfo : DetailVo = new DetailVo();
  constructor(public detailService : DetailServiceService) { }

  ngOnInit() {

    this.detailService.findAllDetails()
  }
 public get allDetails(){
    return this.detailService.allDetails
 }

  public ShowDetailInfo(detail) {
    this.detailInfo = detail;
  }

  public updateDetail(){
    this.detailService.updateDetail(this.detailInfo)
  }

  public get newDetail(){
    return this.detailInfo;
  }
  public deleteDetail(){
    this.detailService.deleteDetail(this.detailInfo.wording)
  }

}
