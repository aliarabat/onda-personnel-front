import { Component, OnInit } from '@angular/core';
import {InterventionDayService} from '../../../controller/service/intervention-day.service';
import {InterventionDayVo} from '../../../controller/model/intervention-day';
import {TimingVo} from '../../../controller/model/timing.model';
import {DateUtil} from '../../../util/date-util';
import {TypeVo} from '../../../controller/model/type';
import {EquipementVo} from '../../../controller/model/equipement';
import DateTimeFormat = Intl.DateTimeFormat;


@Component({
  selector: 'app-gestion-anomaly-create',
  templateUrl: './gestion-anomaly-create.component.html',
  styleUrls: ['./gestion-anomaly-create.component.css']
})
export class GestionAnomalyCreateComponent implements OnInit {

  constructor(private interventionDayService:InterventionDayService) { }
  public interventionDetail : InterventionDayVo = new InterventionDayVo();
  ngOnInit() {
    this.interventionDayService.findAllType()
  }

  public addIntervention(){
    this.interventionDayService.addIntervention();
  }

  public get interventionCreate(){
    return this.interventionDayService.interventionCreate;
  }

  public get breakDurationTotalHour() {
   return this.interventionDayService.breakDurationTotalHour;
  }

  public get breakDurationTotalMinute() {
    return this.interventionDayService.breakDurationTotalMinute;
  }
  public get breakDuration() {
   return this.horaire(this.interventionDayService.breakDuration.hour,this.interventionDayService.breakDuration.minute)
  }

  public get reparationDuration() {
    return this.horaire(this.interventionDayService.reparationDuration.hour,this.interventionDayService.reparationDuration.minute)
  }
  public get interventions(){
    return this.interventionDayService.interventions;
  }

  public get equipement():EquipementVo{
   return this.interventionDayService.equipement
  }

  public show(interv : InterventionDayVo){
    this.interventionDetail = interv;
  }

  public get breakNumberTotal(){
    return this.interventionDayService.breakNumberTotal
  }

  horaire(hour: string, minute: string) {
    return DateUtil.horaire(hour, minute);
  }

 public get types(){
    return this.interventionDayService.allTypes;
 }

 public get selectedType(){
    return this.interventionDayService.selectedType;
 }
     public findEquipmentByType(){
  this.interventionDayService.findByType(this.selectedType)
 }

 public get equipements(){
   return this.interventionDayService.equipments
 }
  deleteRow(id){
    for(let i = 0; i < this.interventionDayService.interventions.length; ++i){
      if (this.interventionDayService.interventions[i].id === id) {
        this.interventionDayService.interventions.splice(i,1);
      }
    }
  }
  public saveIntervention(name :string){
    this.interventionDayService.saveIntervention(name);
  }

  public  toDate (ldt :string){
    let newDate = new Date(ldt);
    return newDate
  }

}
