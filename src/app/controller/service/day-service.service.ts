import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DayVo} from '../model/day.model';
import {EmployeeVo} from '../model/employee.model';
import {DayDetailVo} from '../model/day-detail.model';
import {DetailVo} from '../model/detail.model';
import {TimingVo} from '../model/timing.model';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class DayServiceService {

  constructor(private http: HttpClient) {
  }

  //Urls
  public _url = UrlsUtil.main_personnel_url;
  public _url_employees = this._url + UrlsUtil.url_employee;
  public _url_detail = this._url + UrlsUtil.url_Detail;
  public _url_day = this._url + UrlsUtil.url_day;
  public _url_work = this._url + UrlsUtil.url_work;
  //variables declatarions
  public _employee: EmployeeVo = new EmployeeVo();
  public _employee1: EmployeeVo = new EmployeeVo();
  public _day: DayVo = new DayVo([]);
  public _days: Array<DayVo> = new Array<DayVo>();
  public _dayDetail: DayDetailVo = new DayDetailVo();
  public _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  public _details: Array<DetailVo> = new Array<DetailVo>();
  public _detailsHelper: Array<DetailVo> = new Array<DetailVo>();
  public _detail: DetailVo = new DetailVo();
  //check date credentials
  public _listDate: Array<string> = [];
  //employee normal to fill the service week automaically
  public _employeeCheckType: EmployeeVo = new EmployeeVo(0, '', '', '', '', '');

  public ajouter() {
    if (this._employee.matricule === undefined) {
      SwalUtil.select('l\'employé');
    } else if (this._day.dayDetailsVo.length <= 0) {
      SwalUtil.select('l\'horaire');
    } else if (this._days.length >= 7) {
      SwalUtil.passed('7 jours!');
    } else {
      this._days.push(this._day);
      this._day = new DayVo();
      this.detail = new DetailVo();
    }
  }

  addDetailToBadges() {
    if (this._day.dayDetailsVo.findIndex(dd => dd.detailVo.wording === this._detail.wording) === -1) {
      let dayDetailClone: DayDetailVo = new DayDetailVo();
      dayDetailClone.detailVo = this._details.find(d => d.wording === this._detail.wording);
      this._day.dayDetailsVo.push(dayDetailClone);
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
        data ? this._employees = data : this._employees = [];
      }
    );
  }

  findAllDetails() {
    this.http.get<Array<DetailVo>>(this._url_detail).subscribe(
      data => {
        if (data != null) {
          this._detailsHelper = data;
          this._details = data.filter(dt => dt.mode === 'Normal');
        }
      }
    );
  }

  initializeList() {
    this._days = new Array<DayVo>();
  }

  deleteDay(day: DayVo) {
    const index = this._days.indexOf(day);
    if (index !== -1) {
      this._days.splice(index, 1);
    }
  }

  confirm() {
    if (this._days.length === 7) {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this.http.post(this._url_day + 'matricule/' + this._employee.matricule, this._days).subscribe(
            data => {
              if (data === 1) {
                this._days = [];
                this._employee = new EmployeeVo();
                this._day.dayDetailsVo = [];
                this._listDate = [];
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
              let _dayClone = new DayVo(new Array<DayDetailVo>());
              let _dayDetailClone: DayDetailVo = new DayDetailVo(0, new DetailVo('', '', new TimingVo('0', '0'), new TimingVo('0', '0'), '', ''));
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
