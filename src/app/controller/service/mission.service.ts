import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MissionVo} from '../model/mission.model';
import {DayServiceService} from './day-service.service';
import {EmployeeVo} from '../model/employee.model';
import {DetailVo} from '../model/detail.model';
import {DayVo} from '../model/day.model';
import {DayDetailVo} from '../model/day-detail.model';
import {WorkVo} from '../model/work.model';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(public http: HttpClient) {
  }

  public main_url = UrlsUtil.main_personnel_url;
  public _url = this.main_url + UrlsUtil.url_dayDetail;
  public _urlDay = UrlsUtil.main_personnel_url + UrlsUtil.url_day;
  public _urlEmployee = this.main_url + UrlsUtil.url_employee;
  public _urlWork = this.main_url + UrlsUtil.url_work;
  public _urlMission = this.main_url + UrlsUtil.url_mission;
  public _urlDetail = this.main_url + UrlsUtil.url_Detail;

  public _dayService: DayServiceService;
  public _theDay: DayVo = new DayVo();
  public _dayDetails: Array<DayDetailVo> = new Array<DayDetailVo>();
  public _checkDayDetails: Array<DayDetailVo> = new Array<DayDetailVo>();
  public _dayDetails1: Array<DayDetailVo> = new Array<DayDetailVo>();
  public _details: Array<DetailVo> = new Array<DetailVo>();
  public _theEmployee: EmployeeVo = new EmployeeVo();
  public _works: Array<WorkVo> = new Array<WorkVo>();
  public _theDayDetail1: DayDetailVo = new DayDetailVo();
  public _employee1: EmployeeVo = new EmployeeVo(0, '', '', '', '', '', false);
  public _detail1: DetailVo = new DetailVo('', '', {}, {}, '', '');
  public _missionInit: MissionVo = new MissionVo();
  public _theDayDetail: DayDetailVo = new DayDetailVo(0, this._detail1, null, null, this._missionInit);
  public _mission: MissionVo = new MissionVo();

  updateMission(dayDetail: DayDetailVo) {
    if (dayDetail.missionVo.reference === '' || dayDetail.missionVo.reference === undefined) {
      SwalUtil.insert('la référence de mission!');
    }
    /*else if (dayDetail.missionVo.employee.matricule === '' || dayDetail.missionVo.employee.matricule === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'employé considéré ",
        type: 'warning',
      });
    } */ else if (dayDetail.missionVo.type === '' || dayDetail.missionVo.type === undefined) {
      SwalUtil.insert('le type de mission!');
    } else if (dayDetail.missionVo.startingDate === '' || dayDetail.missionVo.startingDate === undefined) {
      SwalUtil.insert('la date!');
    } /*else if ( dayDetail.detailVo.wording=== '' || dayDetail.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }*/


    else if (dayDetail.missionVo.startingTimeVo.hour === '' || dayDetail.missionVo.startingTimeVo.hour === undefined) {
      SwalUtil.insert('l\'heure début!');
    } else if (dayDetail.missionVo.startingTimeVo.minute === '' || dayDetail.missionVo.startingTimeVo.minute === undefined) {
      SwalUtil.insert('en minutes l\'horaire');
    } else if (dayDetail.missionVo.endingTimeVo.hour === '' || dayDetail.missionVo.endingTimeVo.hour === undefined) {
      SwalUtil.insert('l\'heure fin!');
    } else if (dayDetail.missionVo.endingTimeVo.minute === '' || dayDetail.missionVo.endingTimeVo.minute === undefined) {
      SwalUtil.insert('en minutes l\'horaire');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this.http.get<DayVo>(this._urlDay + 'matricule/' + dayDetail.missionVo.employee.matricule + '/dayDate/' + dayDetail.missionVo.startingDate).subscribe(
            data => {
              if (data == null) {
                SwalUtil.anySuccess('Erreur!', 'Erreur: Cet employé n\'as pas encore de service à cette date ');
              } else {
                this.http.put(this._urlMission, dayDetail).subscribe(
                  (res) => {
                    if (res == 1 || res == 2 || res == 3 || res == 7) {
                      this.findAlldayDetails();
                      this.deleteAllDayDetailsWhereIsNull();
                      SwalUtil.updateOf('Mission', 'service');
                      // @ts-ignore
                      $('#missionModal').modal('hide');
                    } else if (res == -2) {
                      SwalUtil.any('Erreur!', 'Modification du service échouée:Ce fonctionnaire n\'a pas de service à cette date');
                    } else if (res == -6 || res == -7) {
                      SwalUtil.any('Erreur!', 'Modification du service échouée:Ce fonctionnaire est absent à cette date');
                    } else {
                      SwalUtil.any('Erreur!', 'Modification du service échouée:Erreur Inconnue');
                    }
                  },
                );
              }
            }
          );
        }
      });
    }
  }

  findDayDetailById(id: number) {
    this.http.get<DayDetailVo>(this._url + 'id/' + id).subscribe(
      data => {
        if (data != null) {
          this.theDayDetail = data;
          this.theDayDetail1 = data;
        }
      }
    );
  }


  SaveMission(mission: MissionVo, matricule: string) {
    if (mission.reference === '' || mission.reference === undefined) {
      SwalUtil.insert('la référence de la mission!');
    } else if (matricule === '' || matricule === undefined) {
      SwalUtil.select('l\'employé considéré!');
    } else if (mission.type === '' || mission.type === undefined) {
      SwalUtil.insert('le type de mission!');
    } else if (mission.startingDate === '' || mission.startingDate === undefined) {
      SwalUtil.select('la date');
    } /*else if (mission.detailVo.wording === '' || mission.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }*/

    else if (mission.startingTimeVo.hour === '' || mission.startingTimeVo.hour === undefined) {
      SwalUtil.insert('l\'heure début!');
    } else if (mission.startingTimeVo.minute === '' || mission.startingTimeVo.minute === undefined) {
      SwalUtil.insert('en minutes l\'horaire!');
    } else if (mission.endingTimeVo.hour === '' || mission.endingTimeVo.hour === undefined) {
      SwalUtil.insert('l\'heure fin!');
    } else if (mission.endingTimeVo.minute === '' || mission.endingTimeVo.minute === undefined) {
      SwalUtil.insert('en minutes l\'horaire!');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this.http.put(this._url + 'mission/matricule/' + matricule, mission).subscribe(
            (res) => {
              if (res === 1) {
                this.mission = new MissionVo();
                this.findAlldayDetails();
                SwalUtil.anySuccess('Ajout de Mission', 'Modification du service réussite');
              } else if (res === -4) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Cet employé n\'as pas encore de service à cette date!');
              } else if (res === -6) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Cet employé n\'as pas encore de service à ce jour là!');
              } else if (res === -3) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Cet employé est en vacances!');
              } else if (res === -2) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Cet employé est déjà absent pour une raison!');
              } else {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Erreur Inconnue!');
              }
            },
          );
        }
      });
    }
  }

  formInit() {
    this.mission = new MissionVo();
    //this._dayService.employee=new EmployeeVo();
    //this._dayService.detail=new DetailVo();
  }

  findDayDetailsOfDay(matricule: string, dateDay: string) {
    this.http.get<DayVo>(this._urlDay + 'matricule/' + matricule + '/dayDate/' + dateDay).subscribe(
      data => {
        if (data != null) {
          //this.findEmployesByMatricule(matricule);
          this.theDay = data;
          this.checkDayDetails = new Array<DayDetailVo>();
          for (let dayDetail of data.dayDetailsVo) {
            if (dayDetail.detailVo != null) {
              this._checkDayDetails.push(dayDetail);
            }
          }
          this.dayDetails = this._checkDayDetails;
        } else {
          SwalUtil.any('Erreur!', 'Aucun service trouvé : Cet employé n\'as pas encore de service à cette date!');
        }
      }
    );
  }

  findAllWorks() {
    this.http.get<Array<WorkVo>>(this._urlWork).subscribe(
      data => {
        this.works = data;
      }
    );
  }

  findAlldayDetails() {
    this.http.get<Array<DayDetailVo>>(this._url + 'Mission/').subscribe(
      data => data ? this.dayDetails1 = data : this.dayDetails1 = []);
  }

  findEmployesByMatricule(matricule: string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        if (data !== null) {
          this.theEmployee = data;
          this.theDayDetail.missionVo.employee = data;
        } else {
          this.theEmployee = new EmployeeVo(0, '', '', '', '', '');
          this.theDayDetail.missionVo.employee = new EmployeeVo(0, '', '', '', '', '');
        }
      }
    );
  }

  findDetailByWording(wording: string) {
    this.http.get<DetailVo>(this._urlDetail + 'wording/' + wording).subscribe(
      data => {
        this.theDayDetail.detailVo = data;
      }
    );
  }

  deleteMission(dayDetail: DayDetailVo) {
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this.http.put(this._url + 'mission/id/' + dayDetail.id, dayDetail).subscribe(
          (res) => {
            if (res == 1) {
              this.findAlldayDetails();
              this.deleteAllDayDetailsWhereIsNull();
              //SwalUtil.deleted('la Mission', 'Suppression du service réussite');
              SwalUtil.topEndSuccessfully('Suppression');
            } else {
              SwalUtil.any('Erreur!', 'Suppression du service échouée:Erreur Inconnue!');
            }
          },
        );
      }
    });
  }

  getTheDayDetail(dayDetail: DayDetailVo) {
    this._theDayDetail = dayDetail;
  }

  deleteAllDayDetailsWhereIsNull() {
    this.http.delete(this._url + 'null').subscribe();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get mission(): MissionVo {
    return this._mission;
  }

  set mission(value: MissionVo) {
    this._mission = value;
  }

  get dayService(): DayServiceService {
    return this._dayService;
  }

  set dayService(value: DayServiceService) {
    this._dayService = value;
  }

  get urlDay(): string {
    return this._urlDay;
  }

  set urlDay(value: string) {
    this._urlDay = value;
  }

  get theDay(): DayVo {
    return this._theDay;
  }

  set theDay(value: DayVo) {
    this._theDay = value;
  }

  get dayDetails(): Array<DayDetailVo> {
    return this._dayDetails;
  }

  set dayDetails(value: Array<DayDetailVo>) {
    this._dayDetails = value;
  }


  get urlEmployee(): string {
    return this._urlEmployee;
  }

  set urlEmployee(value: string) {
    this._urlEmployee = value;
  }

  get theEmployee(): EmployeeVo {
    return this._theEmployee;
  }

  set theEmployee(value: EmployeeVo) {
    this._theEmployee = value;
  }

  get details(): Array<DetailVo> {
    return this._details;
  }

  set details(value: Array<DetailVo>) {
    this._details = value;
  }


  get urlWork(): string {
    return this._urlWork;
  }

  set urlWork(value: string) {
    this._urlWork = value;
  }

  get works(): Array<WorkVo> {
    return this._works;
  }

  set works(value: Array<WorkVo>) {
    this._works = value;
  }


  get theDayDetail(): DayDetailVo {
    return this._theDayDetail;
  }

  set theDayDetail(value: DayDetailVo) {
    this._theDayDetail = value;
  }

  get employee1(): EmployeeVo {
    return this._employee1;
  }

  set employee1(value: EmployeeVo) {
    this._employee1 = value;
  }

  get detail1(): DetailVo {
    return this._detail1;
  }

  set detail1(value: DetailVo) {
    this._detail1 = value;
  }


  get dayDetails1(): Array<DayDetailVo> {
    return this._dayDetails1;
  }

  set dayDetails1(value: Array<DayDetailVo>) {
    this._dayDetails1 = value;
  }

  get theDayDetail1(): DayDetailVo {
    return this._theDayDetail1;
  }

  set theDayDetail1(value: DayDetailVo) {
    this._theDayDetail1 = value;
  }

  get urlMission(): string {
    return this._urlMission;
  }

  set urlMission(value: string) {
    this._urlMission = value;
  }

  get missionInit(): MissionVo {
    return this._missionInit;
  }

  set missionInit(value: MissionVo) {
    this._missionInit = value;
  }

  get urlDetail(): string {
    return this._urlDetail;
  }

  set urlDetail(value: string) {
    this._urlDetail = value;
  }

  get checkDayDetails(): Array<DayDetailVo> {
    return this._checkDayDetails;
  }

  set checkDayDetails(value: Array<DayDetailVo>) {
    this._checkDayDetails = value;
  }
}
