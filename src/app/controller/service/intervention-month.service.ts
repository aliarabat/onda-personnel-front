import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InterventionMonthVo} from '../model/intervention-month';
import {DateModel} from '../model/date.model';
import {InterventionDayVo} from '../model/intervention-day';

@Injectable({
  providedIn: 'root'
})
export class InterventionMonthService {
  private _url = "http://localhost:8097/dashboard-api/dashboards/interventionMonth/";
  private _listEquipementssByYear: Array<InterventionMonthVo> = new Array<InterventionMonthVo>();
  private _listEquipementsByYearUntouched: Array<InterventionMonthVo> = [];
  private _dateByAnnee: DateModel = new DateModel(new Date().getFullYear());
  private _listInterventionsByDay: Array<InterventionDayVo> = new Array<InterventionDayVo>();


  constructor(private http:HttpClient) { }

  findInterventionMonthByYear(name?: string) {
    this.http.get<Array<InterventionMonthVo>>(this._url + 'year/' + this._dateByAnnee.year).subscribe(
      data => {
        if (data != null) {
          this._listEquipementsByYearUntouched = data;
          if (name === undefined || name === '') {
            this._listEquipementssByYear = data;
          } else {
            this._listEquipementssByYear = data.filter(w => w.equipementVo.name=== name);
          }
        } else {
          this._listEquipementsByYearUntouched = [];
          this._listEquipementssByYear = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }


  findInterventionMonthByMonth() {
    this.http.get<Array<InterventionMonthVo>>(this._url + 'search/year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month).subscribe(
      data => {
        if (data != null) {
          this._listEquipementssByYear = data;
        } else {
          this._listEquipementssByYear = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }

  findInterventionMonthByEquipementAndMonthAndYear(name: string) {
    this.http.get<Array<InterventionMonthVo>>(this._url + 'year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month+ '/name/' + name ).subscribe(
      data => {
        if (data != null) {
          this._listEquipementssByYear = new Array<InterventionMonthVo>();
          this._listEquipementssByYear = data;
        } else {
          this._listEquipementssByYear = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }
  findInterventionMonthById(id: number) {
    this.http.get<InterventionMonthVo>(this._url + 'id/'+id).subscribe(
      data => {
        if (data != null) {
          this._listInterventionsByDay = new Array<InterventionDayVo>();
          this._listInterventionsByDay = data.interventionPartDaysVo;
        } else {
          this._listInterventionsByDay = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get listEquipementssByYear(): Array<InterventionMonthVo> {
    return this._listEquipementssByYear;
  }

  set listEquipementssByYear(value: Array<InterventionMonthVo>) {
    this._listEquipementssByYear = value;
  }

  get listEquipementsByYearUntouched(): Array<InterventionMonthVo> {
    return this._listEquipementsByYearUntouched;
  }

  set listEquipementsByYearUntouched(value: Array<InterventionMonthVo>) {
    this._listEquipementsByYearUntouched = value;
  }

  get dateByAnnee(): DateModel {
    return this._dateByAnnee;
  }

  set dateByAnnee(value: DateModel) {
    this._dateByAnnee = value;
  }

  get listInterventionsByDay(): Array<InterventionDayVo> {
    return this._listInterventionsByDay;
  }

  set listInterventionsByDay(value: Array<InterventionDayVo>) {
    this._listInterventionsByDay = value;
  }
}
