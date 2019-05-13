import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DayVo} from "../model/day.model";
import {EmployeeVo} from "../model/employee.model";
import {DayDetailVo} from "../model/day-detail.model";
import {DetailVo} from "../model/detail.model";
import Swal from "sweetalert2";
import {WorkVo} from '../model/work.model';
import {DateModel} from '../model/date.model';

@Injectable({
  providedIn: 'root'
})
export class DayServiceService {

  constructor(private http: HttpClient) {
  }

  //Urls
  private _url = "http://localhost:8099/personnel-api/personnels/";
  private _url_employees = this._url + "employee/";
  private _url_detail = this._url + "Detail/";
  private _url_day = this._url + "day/";
  private _url_work = this._url + "work/";
  //variables declatarions
  private _employee: EmployeeVo = new EmployeeVo();
  private _employee1: EmployeeVo = new EmployeeVo();
  private _day: DayVo = new DayVo([]);
  private _days: Array<DayVo> = new Array<DayVo>();
  private _dayDetail: DayDetailVo = new DayDetailVo();
  private _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  private _details: Array<DetailVo> = new Array<DetailVo>();
  private _detail: DetailVo = new DetailVo('', '', {}, {}, '', '');
  private _dayDetailsClone: Array<DayDetailVo> = new Array<DayDetailVo>();
  private _dateByDay: DateModel = new DateModel();
  private _listEmployeesByDay: Array<DayVo> = new Array<DayVo>();
  private _dateString: string = 'AAAA-MM-JJ';
  private _works: Array<WorkVo> = new Array<WorkVo>();
  private _daysOfWork: Array<DayVo> = new Array<DayVo>();
  private _listByDay: Array<DayVo> = new Array<DayVo>();
  private _listWorksByDayAndEmployee: Array<WorkVo> = new Array<WorkVo>();
  //check date credentials
  private _listDate: Array<string> = [];

  public ajouter() {
    if (this._employee.matricule === undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de sélectionner l\'employee!'
      });
    } else if (this._detail.wording === '') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de sélectionner l\'horaire!'
      });
    } else if (this._days.length >= 7) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Vous avez ajouté 7 jours!'
      });
    } else {
      this._days.push(this._day);
      this._day = new DayVo();
      this._detail = new DetailVo('', '');
    }
  }

  addDetailToBadges() {
    if (this._day.dayDetailsVo.findIndex(dd => dd.detailVo.wording === this._detail.wording) === -1) {
      let dayDetailClone: DayDetailVo = new DayDetailVo();
      dayDetailClone.detailVo = this._details.find(d=>d.wording===this._detail.wording);
      this._day.dayDetailsVo.push(dayDetailClone);
      this._detail = new DetailVo();
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...!',
        text: 'Cet horaire déja ajouté'
      });
    }
  }

  findAllEmployees() {
    this.http.get<Array<EmployeeVo>>(this._url_employees + "allExist/isExist/" + true).subscribe(
      data => {
        if (data != null) {
          this._employees = data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  findAllDetails() {
    this.http.get<Array<DetailVo>>(this._url_detail).subscribe(
      data => {
        if (data != null) {
          this._details = data;
        }
      }, error => {
        console.log(error);
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-danger mr-1'
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: 'Sauvegarde',
        text: "Etes-vous sure de sauvegarder vos infos?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, sauvegarder!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.http.post(this._url_day + "matricule/" + this._employee.matricule, this._days).subscribe(
            data => {
              if (data == 1) {
                this._days = [];
                this._employee = new EmployeeVo();
                this._day.dayDetailsVo = [];
                this._listDate = [];
              }
            }, error => {
              console.log(error);
            }
          );
          swalWithBootstrapButtons.fire(
            'Sauvegardé!',
            'Vos infos ont été sauvegardées',
            'success'
          )
        }
      });
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error...',
        text: 'Merci de remplir le tableau'
      })
    }
  }

  checkDates() {
    this.http.get<Array<string>>(this._url_work + "ckeckdates/matricule/" + parseInt(this._employee.matricule)).subscribe(
      data => {
        if (data != null) {
          this._listDate = data.map(date => new Date(date).toLocaleDateString());
        } else {
          this._listDate = [];
        }
      }, error => {
        console.log(error);
      }
    )
  }

  reinitializeForm() {
    this._employee = new EmployeeVo();
    this._detail = new DetailVo('', '');
    this._day = new DayVo();
    this._listDate = [];
  }

  substructDetail(dd: DayDetailVo) {
    const index = this._day.dayDetailsVo.indexOf(dd);
    if (index !== -1) {
      this._day.dayDetailsVo.splice(index, 1);
      if (this._day.dayDetailsVo.length === 0) {
        this._detail = new DetailVo('', '');
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

  get url_employees(): string {
    return this._url_employees;
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

  get url_day(): string {
    return this._url_day;
  }

  set url_day(value: string) {
    this._url_day = value;
  }

  get url_work(): string {
    return this._url_work;
  }

  set url_work(value: string) {
    this._url_work = value;
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

  get dateByDay(): DateModel {
    return this._dateByDay;
  }

  set dateByDay(value: DateModel) {
    this._dateByDay = value;
  }

  get listEmployeesByDay(): Array<DayVo> {
    return this._listEmployeesByDay;
  }

  set listEmployeesByDay(value: Array<DayVo>) {
    this._listEmployeesByDay = value;
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

  get dayDetailsClone(): Array<DayDetailVo> {
    return this._dayDetailsClone;
  }

  set dayDetailsClone(value: Array<DayDetailVo>) {
    this._dayDetailsClone = value;
  }

  get listWorksByDayAndEmployee(): Array<WorkVo> {
    return this._listWorksByDayAndEmployee;
  }

  set listWorksByDayAndEmployee(value: Array<WorkVo>) {
    this._listWorksByDayAndEmployee = value;
  }

  get listByDay(): Array<DayVo> {
    return this._listByDay;
  }

  set listByDay(value: Array<DayVo>) {
    this._listByDay = value;
  }

  get daysOfWork(): Array<DayVo> {
    return this._daysOfWork;
  }

  set daysOfWork(value: Array<DayVo>) {
    this._daysOfWork = value;
  }

  get works(): Array<WorkVo> {
    return this._works;
  }

  set works(value: Array<WorkVo>) {
    this._works = value;
  }

  public convertDateToString(date: Date): string {
    return date.toDateString();
  }

  get dateString(): string {
    return this._dateString;
  }

  set dateString(value: string) {
    this._dateString = value;
  }
}
