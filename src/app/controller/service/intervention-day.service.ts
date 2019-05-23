import { Injectable } from '@angular/core';
import {InterventionDayVo} from '../model/intervention-day';
import {TimingVo} from '../model/timing.model';
import {HttpClient} from '@angular/common/http';
import {DetailVo} from '../model/detail.model';
import {EquipementVo} from '../model/equipement';
import {TypeVo} from '../model/type';
import {EmployeeVo} from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionDayService {
  private _url: string = 'http://localhost:8097/dashboard-api/dashboards/interventionDay/';
  private _urlType: string = 'http://localhost:8097/dashboard-api/dashboards/type/';
  private _urlEquipement: string = 'http://localhost:8097/dashboard-api/dashboards/equipement/';
  private _interventionCreate : InterventionDayVo = new InterventionDayVo();
  private _breakNumberTotal : number = 0;
  private _breakDuration : TimingVo = new TimingVo('0','0');
  private _reparationDuration : TimingVo = new TimingVo('0','0');
  private _breakDurationTotal : TimingVo = new TimingVo('0','0');
    private _reparationDurationTotal : TimingVo = new TimingVo();
  private _breakDurationTotalHour : number = 0;
  private _breakDurationTotalMinute : number=0;
  private _allTypes :  Array<TypeVo> = []
  private _equipments : Array<EquipementVo> = []
  private _interventions  : Array<InterventionDayVo> =[];
  private _equipement : EquipementVo = new EquipementVo(0,'')
  constructor(private _http: HttpClient) { }

  public addIntervention(){

    this.getBreakDuration();
    this.getReparationDuration();
    this.breakNumberTotal += parseInt(this.interventionCreate.breakNumber);
    let interventionClone = new InterventionDayVo(0,this.interventionCreate.anomaly,this.interventionCreate.interventionStart,this.interventionCreate.interventionEnd,this.interventionCreate.callIntervention,this.breakDuration,this.reparationDuration,this.interventionCreate.breakNumber,this.interventionCreate.actions)
    this._interventions.push(interventionClone);
    this.interventionCreate = new InterventionDayVo();
  }

  public getBreakDuration() {
    this.http.get<TimingVo>(this._url+"call/"+this.interventionCreate.callIntervention+"/startOrAnd/"+this.interventionCreate.interventionEnd).subscribe(
      data=>{
        this.breakDuration = data;
        console.log(this.breakDuration)
      },error1 => {
        console.log(error1)
      }
    )
  }

  public getReparationDuration() {
    this.http.get<TimingVo>(this._url+"call/"+this.interventionCreate.callIntervention+"/startOrAnd/"+this.interventionCreate.interventionStart).subscribe(
      data=>{
        this.reparationDuration = data;
      },error1 => {
        console.log(error1)
      }
    )
  }

  public  findAllType(){
    this.http.get<Array<TypeVo>>(this._urlType).subscribe(
      data=>{
        this._allTypes = data;
      }, error1 => {
        console.log(error1)
      }
    )
  }

  public  findByType(type:TypeVo){
    this.http.get<Array<EquipementVo>>(this._urlEquipement+"nameEquipement/"+type.name).subscribe(
      data=>{
        this.equipments = data;
      }, error1 => {
        console.log(error1)
      }
    )
  }

  public saveIntervention(nameEquipement : string){
    this._http.post(this._url+"equipement/"+nameEquipement, this.interventions).subscribe(
      data => {
        this.interventions = new Array<InterventionDayVo>();
        this.interventionCreate = new InterventionDayVo();
        this.interventions = new Array<InterventionDayVo>();
        this.breakDuration = new TimingVo('0','0');
      this.reparationDuration= new TimingVo('0','0');
      this.equipement = new EquipementVo()
      }, error1 => {
        console.log(error1);
      }
    );
  }
  get interventionCreate(): InterventionDayVo {
    return this._interventionCreate;
  }

  set interventionCreate(value: InterventionDayVo) {
    this._interventionCreate = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get urlType(): string {
    return this._urlType;
  }

  set urlType(value: string) {
    this._urlType = value;
  }


  get allTypes(): Array<TypeVo> {
    return this._allTypes;
  }

  set allTypes(value: Array<TypeVo>) {
    this._allTypes = value;
  }

  get equipments(): Array<EquipementVo> {
    return this._equipments;
  }

  set equipments(value: Array<EquipementVo>) {
    this._equipments = value;
  }

  get breakDurationTotalHour(): number {
    return this._breakDurationTotalHour;
  }

  set breakDurationTotalHour(value: number) {
    this._breakDurationTotalHour = value;
  }

  get breakDurationTotalMinute(): number {
    return this._breakDurationTotalMinute;
  }

  set breakDurationTotalMinute(value: number) {
    this._breakDurationTotalMinute = value;
  }

  get urlEquipement(): string {
    return this._urlEquipement;
  }

  set urlEquipement(value: string) {
    this._urlEquipement = value;
  }

  get breakNumberTotal(): number {
    return this._breakNumberTotal;
  }

  set breakNumberTotal(value: number) {
    this._breakNumberTotal = value;
  }


  get equipement(): EquipementVo {
    return this._equipement;
  }

  set equipement(value: EquipementVo) {
    this._equipement = value;
  }

  get interventions(): Array<InterventionDayVo> {
    return this._interventions;
  }

  set interventions(value: Array<InterventionDayVo>) {
    this._interventions = value;
  }

  get breakDuration(): TimingVo {
    return this._breakDuration;
  }

  set breakDuration(value: TimingVo) {
    this._breakDuration = value;
  }

  get reparationDuration(): TimingVo {
    return this._reparationDuration;
  }

  set reparationDuration(value: TimingVo) {
    this._reparationDuration = value;
  }

  get breakDurationTotal(): TimingVo {
    return this._breakDurationTotal;
  }

  set breakDurationTotal(value: TimingVo) {
    this._breakDurationTotal = value;
  }

  get reparationDurationTotal(): TimingVo {
    return this._reparationDurationTotal;
  }

  set reparationDurationTotal(value: TimingVo) {
    this._reparationDurationTotal = value;
  }
}
