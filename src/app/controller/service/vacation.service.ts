import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VacationVo} from '../model/vacation.model';
import {EmployeeVo} from '../model/employee.model';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  public _main_url = UrlsUtil.main_personnel_url;
  public _url = this._main_url + UrlsUtil.url_day + UrlsUtil.url_vacation;
  public _urlVac = this._main_url + UrlsUtil.url_vacation;
  public _url_employees = this._main_url + UrlsUtil.url_employee;

  public _vacationCreate: VacationVo = new VacationVo();

  public _employee: EmployeeVo = new EmployeeVo(0, '', '', '', '', '', true);
  public _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  public _vacations: Array<VacationVo> = new Array<VacationVo>();
  public _newVacation: VacationVo = new VacationVo(0, new EmployeeVo(), '', '', '', '');

  constructor(public _http: HttpClient) {
  }

  public saveVacation() {
    if (this.employee.matricule === '' || this.employee.matricule === undefined) {
      SwalUtil.select('l\'employee!');
    } else if (this.vacationCreate.startingDate === '' || this.vacationCreate.startingDate === undefined) {
      SwalUtil.insert('la date debut!');
    } else if (this.vacationCreate.endingDate == '' || this.vacationCreate.endingDate == undefined) {
      SwalUtil.insert('la date fin!');
    } else if (this.vacationCreate.type == '' || this.vacationCreate.type == undefined) {
      SwalUtil.select('le type de congé!');
    } else {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this._http.post(this._url + 'matricule/' + parseInt(this._employee.matricule), this._vacationCreate).subscribe(
            data => {
              this._vacationCreate = new VacationVo();
              this.findAllEmployees();
              this.findAllVacations();
            }, error => {
              console.log(error);
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    }
  }

  findAllEmployees() {
    this.http.get<Array<EmployeeVo>>(this._url_employees + 'allExist/isExist/' + true).subscribe(
      data => {
        data ? this._employees = data : this._employees = [];
      }, error => {
        console.log(error);
      }
    );
  }

  findAllVacations() {
    this.http.get<Array<VacationVo>>(this._urlVac).subscribe(
      data => {
        data ? this._vacations = data : this._vacations = [];
      }, error => {
        console.log(error);
      }
    );
  }

  deleteVaction(id: number) {
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this.http.delete(this.urlVac + '/id/' + id).subscribe(
          () => {
            this.findAllVacations();
            SwalUtil.topEndSavedSuccessfully();
          }, error1 => {
            console.log(error1);
          }
        );
      }
    });
  }

  updateEmployee(newVacation: VacationVo, matricule: string) {
    this._http.put(this._url + 'matricule/' + matricule, newVacation).subscribe(data => {
        this.findAllVacations();
        SwalUtil.topEndSavedSuccessfully();
      }, error1 => {
        console.log(error1);
      }
    );
  }

  findVacationById(id: number) {
    this._http.get<VacationVo>(this._url + 'id/' + id).subscribe(
      data => {
        data ? this._newVacation = data : this._newVacation = new VacationVo(0, new EmployeeVo(), '', '', '', '');
      }, error1 => {
        console.log(error1);
      }
    );
  }

  get vacations(): Array<VacationVo> {
    return this._vacations;
  }

  set vacations(value: Array<VacationVo>) {
    this._vacations = value;
  }

  get url_employees(): string {
    return this._url_employees;
  }

  set url_employees(value: string) {
    this._url_employees = value;
  }

  get newVacation(): VacationVo {
    return this._newVacation;
  }

  set newVacation(value: VacationVo) {
    this._newVacation = value;
  }

  get employees(): Array<EmployeeVo> {
    return this._employees;
  }

  set employees(value: Array<EmployeeVo>) {
    this._employees = value;
  }

  get urlVac(): string {
    return this._urlVac;
  }

  set urlVac(value: string) {
    this._urlVac = value;
  }

  get employeeVo(): Array<EmployeeVo> {
    return this._employees;
  }

  set employeeVo(value: Array<EmployeeVo>) {
    this._employees = value;
  }

  get employee(): EmployeeVo {
    return this._employee;
  }

  set employee(value: EmployeeVo) {
    this._employee = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get vacationCreate(): VacationVo {
    return this._vacationCreate;
  }

  set vacationCreate(value: VacationVo) {
    this._vacationCreate = value;
  }
}
