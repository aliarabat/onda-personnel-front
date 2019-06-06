import { Component, OnInit } from '@angular/core';
import {DetailServiceService} from '../../../controller/service/detail-service.service';
import {TimingVo} from '../../../controller/model/timing.model';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';

@Component({
  selector: 'app-gestion-timing-create',
  templateUrl: './gestion-timing-create.component.html',
  styleUrls: ['./gestion-timing-create.component.css']
})
export class GestionTimingCreateComponent implements OnInit {

  constructor(private detailService : DetailServiceService, private router:Router) { }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }
 public get detail(){
    return this.detailService.detailCreate
 }

 public get details(){
    return this.detailService.details
 }

 public addDetail(){
    this.detailService.addDetail()
 }

 public  get he (){
   return this.detailService.he
 }
  public  get hn (){
    return this.detailService.hn
  }
  public cleanForm(){
    this.detailService.cleanForm()
  }

  public saveDetails(){
    this.detailService.saveDetails()
  }

  public  cleanList(){
    this.detailService.cleanList()
  }

  deleteRow(wording){
    for(let i = 0; i < this.detailService.details.length; ++i){
      if (this.detailService.details[i].wording === wording) {
        this.detailService.details.splice(i,1);
      }
    }
  }
}
