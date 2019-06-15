import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DayVo} from '../model/day.model';
import {EmployeeVo} from '../model/employee.model';
import {DayDetailVo} from '../model/day-detail.model';
import {DetailVo} from '../model/detail.model';
import {TimingVo} from '../model/timing.model';
import { SwalUtil } from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class DayServiceService {

  constructor(private http: HttpClient) {
  }

  // Urls
  public _url = UrlsUtil.main_personnel_url;
  public _url_employees = this._url + UrlsUtil.url_employee;
  public _url_detail = this._url + UrlsUtil.url_Detail;
  public _url_day = this._url + UrlsUtil.url_day;
  public _url_work = this._url + UrlsUtil.url_work;
  // variables declatarions
  public _employee: EmployeeVo = new EmployeeVo();
  public _employee1: EmployeeVo = new EmployeeVo();
  public _day: DayVo = new DayVo([]);
  public _days: Array<DayVo> = new Array<DayVo>();
  public _dayDetail: DayDetailVo = new DayDetailVo();
  public _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  public _details: Array<DetailVo> = new Array<DetailVo>();
  public _detailsHelper: Array<DetailVo> = new Array<DetailVo>();
  public _detail: DetailVo = new DetailVo();
  // check date credentials
  public _listDate: Array<string> = [];
  // employee normal to fill the service week automaically
  public _employeeCheckType: EmployeeVo = new EmployeeVo(0, '', '', '', '', '');

  public ajouter() {
    if (this.employee.matricule === undefined) {
      SwalUtil.select('l\'employé');
    } else if (this.day.dayDetailsVo.length <= 0) {
      SwalUtil.select('l\'horaire');
    } else if (this.days.length >= 7) {
      SwalUtil.passed('7 jours!');
    } else {
      this.days.push(this.day);
      this.day = new DayVo();
      this.detail = new DetailVo();
    }
  }

  addDetailToBadges() {
    if (this.day.dayDetailsVo.findIndex(dd => dd.detailVo.wording === this.detail.wording) === -1) {
      const dayDetailClone: DayDetailVo = new DayDetailVo();
      dayDetailClone.detailVo = this._details.find(d => d.wording === this.detail.wording);
      this.day.dayDetailsVo.push(dayDetailClone);
    } else {
      SwalUtil.alreadyExist('Cette horaire');
    }
  }

  findAllEmployees() {
    this.http.get<Array<EmployeeVo>>(this._url_employees + 'allExist/isExist/' + true).subscribe(
      data => {
        data ? this._employees = data : this._employees = [];
      }
    );
  }

  findAllTechEmployees() {
    this.http.get<Array<EmployeeVo>>(this._url_employees + 'type/Technique').subscribe(
      data => {
        data ? this.employees = data : this.employees = [];
      }
    );
  }

  findAllDetails() {
    this.http.get<Array<DetailVo>>(this._url_detail).subscribe(
      data => {
        if (data != null) {
          this.detailsHelper = data;
          this.details = data.filter(dt => dt.mode === 'Normal');
        }
      }
    );
  }

  initializeList() {
    this.days = new Array<DayVo>();
  }

  deleteDay(day: DayVo) {
    const index = this.days.indexOf(day);
    if (index !== -1) {
      this.days.splice(index, 1);
    }
  }

  confirm() {
    if (this.days.length === 7) {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this.http.post(this._url_day + 'matricule/' + this.employee.matricule, this.days).subscribe(
            data => {
              if (data === -1) {
                SwalUtil.any('Oops..!', 'L\'employé n\'existe pas');
              } else if (data === -2) {
                SwalUtil.any('Oops..!', 'La liste est vide');
              } else if (data === -3) {
                SwalUtil.any('Oops..!', 'La liste est inférieure à 7 jours');
              } else {
                this.days = [];
                this.employee = new EmployeeVo();
                this.day.dayDetailsVo = [];
                this.listDate = [];
                this.detail = new DetailVo('', '');
              }
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    } else {
      SwalUtil.fillTheTable();
    }
  }

  checkDates() {
    this.http.get<Array<string>>(this._url_work + 'ckeckdates/matricule/' + parseInt(this._employee.matricule)).subscribe(
      data => {
        if (data != null) {
          this._listDate = data.map(date => new Date(date).toLocaleDateString());
          this._employeeCheckType = this._employees.find(emp => parseInt(emp.matricule) === parseInt(this._employee.matricule));
          if (this._employeeCheckType.type === 'Administratif') {
            for (let i = 0; i <= 6; i++) {
              const _dayClone = new DayVo(new Array<DayDetailVo>());
              const _dayDetailClone: DayDetailVo = new DayDetailVo(0, new DetailVo('', '', new TimingVo('0', '0'), new TimingVo('0', '0'), '', ''));
              if (i <= 4) {
                _dayDetailClone.detailVo = this._details.find(dt => dt.wording === 'ADM' || dt.wording === 'ADM1');
              } else {
                _dayDetailClone.detailVo = this._detailsHelper.find(dt => dt.wording === 'R');
              }
              _dayClone.dayDetailsVo.push(_dayDetailClone);
              this._days.push(_dayClone);
            }
          } else {
            this._days = new Array<DayVo>();
          }
        } else {
          this._listDate = [];
        }
      }
    );
  }

  substructDetail(dd: DayDetailVo) {
    const index = this._day.dayDetailsVo.indexOf(dd);
    if (index !== -1) {
      this._day.dayDetailsVo.splice(index, 1);
      if (this._day.dayDetailsVo.length === 0) {
        this._detail = new DetailVo();
      }
    }
  }

  get listDate(): Array<string> {
    return this._listDate;
  }

  set listDate(value: Array<string>) {
    this._listDate = value;
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get employee1(): EmployeeVo {
    return this._employee1;
  }

  set employee1(value: EmployeeVo) {
    this._employee1 = value;
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

  get employee(): EmployeeVo {
    return this._employee;
  }

  set employee(value: EmployeeVo) {
    this._employee = value;
  }

  get days(): Array<DayVo> {
    return this._days;
  }

  set days(value: Array<DayVo>) {
    this._days = value;
  }

  get dayDetail(): DayDetailVo {
    return this._dayDetail;
  }

  set dayDetail(value: DayDetailVo) {
    this._dayDetail = value;
  }

  get day(): DayVo {
    return this._day;
  }

  set day(value: DayVo) {
    this._day = value;
  }

  get employeeVo(): Array<EmployeeVo> {
    return this._employees;
  }

  set employeeVo(value: Array<EmployeeVo>) {
    this._employees = value;
  }

  get detailVo(): Array<DetailVo> {
    return this._details;
  }

  set detailVo(value: Array<DetailVo>) {
    this._details = value;
  }

  get detail(): DetailVo {
    return this._detail;
  }

  set detail(value: DetailVo) {
    this._detail = value;
  }

  get detailsHelper(): Array<DetailVo> {
    return this._detailsHelper;
  }

  set detailsHelper(value: Array<DetailVo>) {
    this._detailsHelper = value;
  }
}
