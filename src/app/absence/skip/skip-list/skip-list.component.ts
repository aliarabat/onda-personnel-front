import {Component, OnInit} from '@angular/core';
import {SkipService} from '../../../controller/service/skip.service';
import {SkipVo} from '../../../controller/model/skip.model';
import {EmployeeVo} from '../../../controller/model/employee.model';
import {DayDetailVo} from '../../../controller/model/day-detail.model';
import {DetailVo} from '../../../controller/model/detail.model';
import {ReplacementVo} from '../../../controller/model/replacement.model';
import {DayServiceService} from '../../../controller/service/day-service.service';

@Component({
  selector: 'app-skip-list',
  templateUrl: './skip-list.component.html',
  styleUrls: ['./skip-list.component.css']
})
export class SkipListComponent implements OnInit {
  public dayDetailInfo : DayDetailVo = new DayDetailVo(0,new DetailVo(),new ReplacementVo(),new SkipVo(0,'',new EmployeeVo()))
  constructor(public skipService: SkipService,private dayService:DayServiceService) {
  }

  ngOnInit() {
    this.skipService.findAllSkips();
    this.dayService.findAllDetails();

  }
  public get dayDetails(){
    return this.skipService.dayDetails
  }
  findDayDetailById(id:number){
    this.skipService.findDayDetailById(id);
  }
  public deleteSkip(){
    this.skipService.deleteSkip(this.dayDetailInfo.skipVo.id)
  }

  public ShowDetailInfo(dayDetail){
    this.dayDetailInfo = dayDetail;
  }

  public get selectedDayDetail(){
    return this.skipService.selectedDayDetail;
  }
  get detailVo(){
    return this.dayService.detailVo;
  }
  findDetailByWording(){
    this.skipService.findDetailByWording(this.skipService.selectedDayDetail.skipVo.detailVo.wording);
  }
  updateSkip(daydetail:DayDetailVo){
    this.skipService.updateSkip(daydetail);
  }
}
