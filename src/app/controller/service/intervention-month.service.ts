import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InterventionMonthVo} from '../model/intervention-month';
import {DateModel} from '../model/date.model';
import {InterventionDayVo} from '../model/intervention-day';
import Swal from "sweetalert2";
import {SwalUtil} from "../../util/swal-util";

@Injectable({
  providedIn: 'root'
})
export class InterventionMonthService {
  private _url = "http://localhost:8097/dashboard-api/dashboards/interventionMonth/";
  private _listEquipementssByYear: Array<InterventionMonthVo> = new Array<InterventionMonthVo>();
  private _listEquipementsByYearUntouched: Array<InterventionMonthVo> = [];
  private _dateByAnnee: DateModel = new DateModel(new Date().getFullYear());
  private _listInterventionsByDay: Array<InterventionDayVo> = new Array<InterventionDayVo>();
  private _dateForPrinting: DateModel = new DateModel(new Date().getFullYear());
  private _interventionMonthVoSearch: InterventionMonthVo = new InterventionMonthVo();

  constructor(private http: HttpClient) {
  }

  findInterventionMonthByYear(name?: string) {
    this.http.get<Array<InterventionMonthVo>>(this._url + 'year/' + this._dateByAnnee.year).subscribe(
      data => {
        if (data != null) {
          this._listEquipementsByYearUntouched = data;
          if (name === undefined || name === '') {
            this._listEquipementssByYear = data;
          } else {
            this._listEquipementssByYear = data.filter(w => w.equipementVo.name === name);
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
    this.http.get<Array<InterventionMonthVo>>(this._url + 'year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month + '/name/' + name).subscribe(
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
    this.http.get<InterventionMonthVo>(this._url + 'id/' + id).subscribe(
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

  get dateForPrinting(): DateModel {
    return this._dateForPrinting;
  }

  set dateForPrinting(value: DateModel) {
    this._dateForPrinting = value;
  }

  searchInterventionMonthToPrint() {
    if (this._dateForPrinting.year === null || this._dateForPrinting.year === undefined) {
      SwalUtil.insert("l'année");
    } else if (this._dateForPrinting.month === null || this._dateForPrinting.month === undefined) {
      SwalUtil.insert("le mois");
    } else {
      this.http.get<InterventionMonthVo>(this._url + 'interventiontoprint/year/' + this._dateForPrinting.year + '/month/' + this._dateForPrinting.month).subscribe(
        data => {
          if (data != null) {
            this._interventionMonthVoSearch = data;
          } else {
            this._interventionMonthVoSearch = new InterventionMonthVo();
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  async print(fullYear: number, month: number) {
    // inputOptions can be an object or Promise
    const {value: type} = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'dashboard': 'Tableau de bord',
        'graph': 'Graphe'
      },
      inputPlaceholder: 'Select une format',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'dashboard') {
            resolve();
          } else if (value === 'graph') {
            resolve()
          } else {
            resolve('Merci de selectionner un choix');
          }
        });
      }
    });

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    const httpOptions = {
      responseType: 'ArrayBuffer',
      headers: headers
    };

    if (type === 'dashboard') {

      // @ts-ignore
      return this.http.get(this._url + "printdoc/year/" + fullYear + "/month/" + (month + 1), httpOptions).subscribe((result) => {
        this.downLoadFile(result, 'application/pdf');
      });
    } else if (type=== 'graph') {
      const {value: object} = await Swal.fire({
        input: 'number',
        inputPlaceholder: 'Entrer l\'objectif',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve();
            } else {
              resolve('Merci de saisir un nombre valide');
            }
          });
        }
      });
      if (object.isPrototypeOf(Number)) {
        // @ts-ignore
        return this.http.get(this._url + "printgraph/year/" + fullYear + "/month/" + (month + 1) + "/object/" + object, httpOptions).subscribe((result) => {
          this.downLoadFile(result, 'application/pdf');
        });
      }
    }
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type});
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  get interventionMonthVoSearch(): InterventionMonthVo {
    return this._interventionMonthVoSearch;
  }

  set interventionMonthVoSearch(value: InterventionMonthVo) {
    this._interventionMonthVoSearch = value;
  }
}
