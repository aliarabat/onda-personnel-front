import {Injectable} from '@angular/core';
import {InterventionDayVo} from '../model/intervention-day';
import {TimingVo} from '../model/timing.model';
import {HttpClient} from '@angular/common/http';
import {EquipementVo} from '../model/equipement';
import {TypeVo} from '../model/type';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class InterventionDayService {

  public _main_url = UrlsUtil.main_dashboard_url;
  public _url: string = this._main_url + UrlsUtil.url_interventionDay;
  public _urlType: string = this._main_url + UrlsUtil.url_type;
  public _urlEquipement: string = this._main_url + UrlsUtil.url_equipement;

  public _interventionCreate: InterventionDayVo = new InterventionDayVo();
  public _breakNumberTotal: number = 0;
  public _breakDuration: TimingVo = new TimingVo('0', '0');
  public _reparationDuration: TimingVo = new TimingVo('0', '0');
  public _breakDurationTotal: TimingVo = new TimingVo('0', '0');
  public _reparationDurationTotal: TimingVo = new TimingVo();
  public _breakDurationTotalHour: number = 0;
  public _breakDurationTotalMinute: number = 0;
  public _allTypes: Array<TypeVo> = [];
  public _equipments: Array<EquipementVo> = [];
  public _interventions: Array<InterventionDayVo> = [];
  public _equipement: EquipementVo = new EquipementVo(0, '');
  public _selectedType: TypeVo = new TypeVo();

  constructor(public _http: HttpClient) {
  }

  public addIntervention() {
    if (this.selectedType.name === '' || this.selectedType.name === undefined) {
      SwalUtil.insert(' le type d\'équipement');
    } else if (this.equipement.name == '' || this.equipement.name == undefined) {
      SwalUtil.insert(' l\'équipement');
    } else if (this.interventionCreate.anomaly == '' || this.interventionCreate.anomaly == undefined) {
      SwalUtil.insert(' l\'anomalie');
    } else if (this.interventionCreate.callIntervention == undefined || this.interventionCreate.callIntervention == '') {
      SwalUtil.insert('la date d\'appel d\'intervention');
    } else if (this.interventionCreate.interventionStart == undefined || this.interventionCreate.interventionStart == '') {
      SwalUtil.insert('la date début d\'intervention');
    } else if (this.interventionCreate.interventionEnd == undefined || this.interventionCreate.interventionEnd == '') {
      SwalUtil.insert('la date fin d\'intervention');
    } else if (this.interventionCreate.breakNumber == undefined || this.interventionCreate.breakNumber == '') {
      SwalUtil.insert('le nombre d\'arrêts');
    } else if (this.interventionCreate.actions == undefined || this.interventionCreate.actions == '') {
      SwalUtil.insert('l\'action d\'anomalie');
    } else if (this.interventionCreate.interventionStart < this.interventionCreate.callIntervention || this.interventionCreate.interventionEnd < this.interventionCreate.interventionStart || this.interventionCreate.interventionEnd < this.interventionCreate.callIntervention) {
      SwalUtil.insert('les dates');
    } else {
      this.getBreakDuration();
      this.getReparationDuration();
      this.breakNumberTotal += parseInt(this.interventionCreate.breakNumber);
      let interventionClone = new InterventionDayVo(0, this.interventionCreate.anomaly, this.interventionCreate.interventionStart, this.interventionCreate.interventionEnd, this.interventionCreate.callIntervention, this.breakDuration, this.reparationDuration, this.interventionCreate.breakNumber, this.interventionCreate.actions);
      this._interventions.push(interventionClone);
      this.interventionCreate = new InterventionDayVo();
    }
  }

  public getBreakDuration() {
    this.http.get<TimingVo>(this._url + 'call/' + this.interventionCreate.callIntervention + '/startOrAnd/' + this.interventionCreate.interventionEnd).subscribe(
      data => {
        this.breakDuration = data;
        console.log(this.breakDuration);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getReparationDuration() {
    this.http.get<TimingVo>(this._url + 'call/' + this.interventionCreate.interventionStart + '/startOrAnd/' + this.interventionCreate.interventionEnd).subscribe(
      data => {
        this.reparationDuration = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public findAllType() {
    this.http.get<Array<TypeVo>>(this._urlType).subscribe(
      data => {
        this._allTypes = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public findByType(type: TypeVo) {
    this.http.get<Array<EquipementVo>>(this._urlEquipement + 'nameEquipement/' + type.name).subscribe(
      data => {
        this.equipments = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public saveIntervention(nameEquipement: string) {
    if (this.interventions.length != 0) {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this._http.post(this._url + 'equipement/' + nameEquipement, this.interventions).subscribe(
            data => {
              this.interventions = new Array<InterventionDayVo>();
              this.interventionCreate = new InterventionDayVo();
              this.interventions = new Array<InterventionDayVo>();
              this.breakDuration = new TimingVo('0', '0');
              this.reparationDuration = new TimingVo('0', '0');
              this.equipement = new EquipementVo();
              this.selectedType = new TypeVo();
              SwalUtil.savedSuccessfully('Sauvegarde');
            }, error1 => {
              console.log(error1);
            }
          );
        }
      });
    } else {
      SwalUtil.fillTheTable();
    }
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

  get selectedType(): TypeVo {
    return this._selectedType;
  }

  set selectedType(value: TypeVo) {
    this._selectedType = value;
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
