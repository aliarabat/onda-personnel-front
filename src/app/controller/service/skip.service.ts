import {Injectable} from '@angular/core';
import {EmployeeVo} from '../model/employee.model';
import {DetailVo} from '../model/detail.model';
import {HttpClient} from '@angular/common/http';
import {SkipVo} from '../model/skip.model';
import {DayDetailVo} from '../model/day-detail.model';
import {DayVo} from '../model/day.model';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class SkipService {
  public _url = UrlsUtil.main_personnel_url;
  public _urlDay = this._url + UrlsUtil.url_day;
  public _urlSkip = this._url + UrlsUtil.url_skip;

  public _url_employees = this._url + 'employee/';
  public _url_detail = this._url + 'Detail/';
  public _url_skip = this._url + 'dayDetail/skip/';
  public _url_dayDetail = this._url + 'dayDetail/';
  public _employee: EmployeeVo = new EmployeeVo();
  public _detail: DetailVo = new DetailVo('', '', {}, {}, '', '');
  public _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  public _details: Array<DetailVo> = new Array<DetailVo>();
  public _skipCreate: SkipVo = new SkipVo();
  public _dayDetails: Array<DayDetailVo> = new Array<DayDetailVo>();
  public _employee1: EmployeeVo = new EmployeeVo(0, '', '', '', '', '', false);
  public _detail1: DetailVo = new DetailVo('', '', {}, {}, '', '');
  public _skipInit: SkipVo = new SkipVo(0, '', this._employee1, '', '', new DetailVo());
  public _selectedDayDetail: DayDetailVo = new DayDetailVo(0, this._detail1, null, this._skipInit, null);
  public _skip: SkipVo = new SkipVo();

  constructor(public _http: HttpClient) {
  }

  findAllEmployees() {
    this._http.get<Array<EmployeeVo>>(this._url_employees + 'allExist/isExist/' + true).subscribe(
      data => {
        data ?
          this._employees = data : this._employees = [];
      }, error => {
        console.log(error);
      }
    );
  }

  findAllDetails() {
    this._http.get<Array<DetailVo>>(this._url_detail).subscribe(
      data => {
        data ? this._details = data : this._details = [];
      }, error => {
        console.log(error);
      }
    );
  }

  public saveSkip() {
    if (this.employee.matricule === '' || this.employee.matricule === undefined) {
      SwalUtil.select('l\'employee!');
    } else if (this.skipCreate.type === '' || this.skipCreate.type === undefined) {
      SwalUtil.insert('le type d\'absence!');
    } else if (this.skipCreate.skipDate == '' || this.skipCreate.skipDate == undefined) {
      SwalUtil.insert('le date d\'absence!');
    } else if (this.skipCreate.detailVo.wording == '' || this.skipCreate.detailVo.wording == undefined) {
      SwalUtil.select('l\'horaire!');
    } else {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this._http.put(this._url_skip + 'matricule/' + this.employee.matricule + '/wordingDetail/' + this._skipCreate.detailVo.wording, this._skipCreate).subscribe(
            data => {
              this._employee = new EmployeeVo();
              this._detail = new DetailVo();
              this._skipCreate = new SkipVo();
              this.findAllSkips();
              this.deleteAllDayDetailsWhereIsNull();
            }, error1 => {
              console.log(error1);
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    }
  }

  findAllSkips() {
    this._http.get<Array<DayDetailVo>>(this._url_dayDetail).subscribe(
      data => {
        data ? this._dayDetails = data : this._dayDetails = [];
      }, error1 => {
        console.log(error1);
      }
    );
  }

  findSkipedEmployesByMatricule(matricule: string) {
    this.http.get<EmployeeVo>(this._url + 'employee/matricule/' + matricule).subscribe(
      data => {
        this.employee = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findDetailByWording(wording: string) {
    this.http.get<DetailVo>(this._url_detail + 'wording/' + wording).subscribe(
      data => {
        if (data != null) {
          this.selectedDayDetail.skipVo.detailVo = data;
          this.selectedDayDetail.detailVo = data;
          this.skipCreate.detailVo = data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  deleteSkip(id: number) {
    console.log(id);
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this.http.delete(this._url_dayDetail + 'id/' + id).subscribe(
          () => {
            this.findAllSkips();
            SwalUtil.topEndSuccessfully('Suppression');
          }, error1 => {
            console.log(error1);
          }
        );
      }
    });
  }

  findDayDetailById(id: number) {
    this.http.get<DayDetailVo>(this._url_dayDetail + 'id/' + id).subscribe(
      data => {
        if (data != null) {
          this.selectedDayDetail = data;
        }
      }, error => {
        console.log(error);
      }
    );
  }


  updateSkip(dayDetail: DayDetailVo) {
    if (dayDetail.skipVo.type === '' || dayDetail.skipVo.type === undefined) {
      SwalUtil.insert('le type d\'absence');
    } else if (dayDetail.skipVo.skipDate === '' || dayDetail.skipVo.skipDate === undefined) {
      SwalUtil.insert('la date d\'absence');
    } else if (dayDetail.detailVo.wording === '' || dayDetail.detailVo.wording === undefined) {
      SwalUtil.select('l\'horaire d\'absence');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this.http.get<DayVo>(this._urlDay + 'matricule/' + dayDetail.skipVo.employeeVo.matricule + '/dayDate/' + dayDetail.skipVo.skipDate).subscribe(
            data => {
              if (data == null) {
                SwalUtil.any('Erreur!', 'Erreur: Cet employé n\'as pas encore de service à cette date');
              } else {
                this.http.put(this._urlSkip, dayDetail).subscribe(
                  (res) => {
                    if (res == 1 || res == 2 || res == 3 || res == 7) {
                      this.findAllSkips();
                      this.deleteAllDayDetailsWhereIsNull();
                      SwalUtil.anySuccess('Modification d\'absence', 'Modification du service réussite');
                      // @ts-ignore
                      $('#skipModal').modal('hide');
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
            }, error => {
              console.log(error);
            }
          );
        }
      });
    }
  }

  deleteAllDayDetailsWhereIsNull() {
    this.http.delete(this._url_dayDetail + 'null').subscribe();
  }

  formInit() {
    this.skipCreate = new SkipVo();
    this.employee = new EmployeeVo();
  }

  get url_dayDetail(): string {
    return this._url_dayDetail;
  }

  set url_dayDetail(value: string) {
    this._url_dayDetail = value;
  }

  get employee(): EmployeeVo {
    return this._employee;
  }

  set employee(value: EmployeeVo) {
    this._employee = value;
  }

  get detail(): DetailVo {
    return this._detail;
  }

  set detail(value: DetailVo) {
    this._detail = value;
  }


  get dayDetails(): Array<DayDetailVo> {
    return this._dayDetails;
  }

  set dayDetails(value: Array<DayDetailVo>) {
    this._dayDetails = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get url_employees(): string {
    return this._url_employees;
  }

  get skipCreate(): SkipVo {
    return this._skipCreate;
  }

  set skipCreate(value: SkipVo) {
    this._skipCreate = value;
  }

  set url_employees(value: string) {
    this._url_employees = value;
  }

  get url_detail(): string {
    return this._url_detail;
  }

  set url_detail(value: string) {
    this._url_detail = value;
  }

  get url_skip(): string {
    return this._url_skip;
  }

  set url_skip(value: string) {
    this._url_skip = value;
  }

  get employees(): Array<EmployeeVo> {
    return this._employees;
  }

  set employees(value: Array<EmployeeVo>) {
    this._employees = value;
  }

  get details(): Array<DetailVo> {
    return this._details;
  }

  set details(value: Array<DetailVo>) {
    this._details = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
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

  get skipInit(): SkipVo {
    return this._skipInit;
  }

  set skipInit(value: SkipVo) {
    this._skipInit = value;
  }

  get selectedDayDetail(): DayDetailVo {
    return this._selectedDayDetail;
  }

  set selectedDayDetail(value: DayDetailVo) {
    this._selectedDayDetail = value;
  }

  get urlDay(): string {
    return this._urlDay;
  }

  set urlDay(value: string) {
    this._urlDay = value;
  }

  get urlSkip(): string {
    return this._urlSkip;
  }

  set urlSkip(value: string) {
    this._urlSkip = value;
  }

  get skip(): SkipVo {
    return this._skip;
  }

  set skip(value: SkipVo) {
    this._skip = value;
  }
}
