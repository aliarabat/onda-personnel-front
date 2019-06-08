import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InterventionMonthVo} from '../model/intervention-month';
import {DateModel} from '../model/date.model';
import {InterventionDayVo} from '../model/intervention-day';
import Swal from 'sweetalert2';
import {SwalUtil} from '../../util/swal-util';
import {downloadfile} from '../../util/downloadfile-util';
import {MonthUtil} from '../../util/month-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class InterventionMonthService {
  public _url = UrlsUtil.main_dashboard_url + UrlsUtil.url_interventionMonth;
  public _listEquipementssByYear: Array<InterventionMonthVo> = new Array<InterventionMonthVo>();
  public _dateByAnnee: DateModel = new DateModel(new Date().getFullYear());
  public _listInterventionsByDay: Array<InterventionDayVo> = new Array<InterventionDayVo>();
  public _dateForPrinting: DateModel = new DateModel(new Date().getFullYear());
  public _interventionMonthVoSearch: InterventionMonthVo = new InterventionMonthVo();

  constructor(public http: HttpClient) {
  }

  findInterventionMonthByYear(name?: string) {
    this.http.get<Array<InterventionMonthVo>>(this._url + 'year/' + this._dateByAnnee.year).subscribe(
      data => {
        if (data != null) {
          if (name === undefined || name === '') {
            this._listEquipementssByYear = data;
          } else {
            this._listEquipementssByYear = data.filter(w => w.equipementVo.name === name);
          }
        } else {
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

  searchInterventionMonthToPrint() {
    if (this._dateForPrinting.year === null || this._dateForPrinting.year === undefined) {
      SwalUtil.insert('l\'année');
    } else if (this._dateForPrinting.month === null || this._dateForPrinting.month === undefined) {
      SwalUtil.insert('le mois');
    } else {
      this.http.get<InterventionMonthVo>(this._url + 'interventiontoprint/year/' + this._dateForPrinting.year + '/month/' + this._dateForPrinting.month).subscribe(
        data => {
          data ? this._interventionMonthVoSearch = data : this._interventionMonthVoSearch = new InterventionMonthVo();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  async print(fullYear: number, month: number) {
    // inputOptions can be an object or Promise
    const {value: type} = await Swal.fire({
      title: 'Selection du format désiré',
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
            resolve();
          } else {
            resolve('Merci de selectionner un choix');
          }
        });
      }
    });

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    const httpOptions = {
      responseType: 'blob' as 'arrayBuffer',
      headers: headers
    };

    if (type === 'dashboard') {
      // @ts-ignore
      return this.http.get<Blob>(this._url + 'printdoc/year/' + fullYear + '/month/' + (month + 1), httpOptions).subscribe(async (result) => {
        await SwalUtil.loadAndWait();
        downloadfile(result, 'application/pdf', 'TableauDeBord' + MonthUtil.getMonth(month) + fullYear + '.pdf');
      });
    } else if (type === 'graph') {
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
      if (object) {
        // @ts-ignore
        return this.http.get(this._url + 'printgraph/year/' + fullYear + '/month/' + (month + 1) + '/object/' + object, httpOptions).subscribe(async (result) => {
          await SwalUtil.loadAndWait();
          downloadfile(result, 'application/pdf', 'TBF' + MonthUtil.getMonth(month) + fullYear + '.pdf');
        });
      }
    }
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

  get interventionMonthVoSearch(): InterventionMonthVo {
    return this._interventionMonthVoSearch;
  }

  set interventionMonthVoSearch(value: InterventionMonthVo) {
    this._interventionMonthVoSearch = value;
  }
}
