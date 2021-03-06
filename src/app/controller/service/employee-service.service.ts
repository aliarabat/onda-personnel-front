import {Injectable} from '@angular/core';
import {EmployeeVo} from '../model/employee.model';
import {HttpClient} from '@angular/common/http';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  public _url: string = UrlsUtil.main_personnel_url + UrlsUtil.url_employee;

  public _employeeCreate: EmployeeVo = new EmployeeVo();
  public _employees: Array<EmployeeVo> = [];
  public _allEmployees: Array<EmployeeVo> = [];
  public _employeeSearch: Array<EmployeeVo> = [];
  public _newEmployee: EmployeeVo = new EmployeeVo();

  public _employerSearch: EmployeeVo = new EmployeeVo();

  constructor(private _http: HttpClient) {
  }

  public addEmployee() {
    if (this.employeeCreate.matricule == '' || this.employeeCreate.matricule == undefined) {
      SwalUtil.insert('le matricule!');
    } else if (this.employeeCreate.lastName == '' || this.employeeCreate.lastName == undefined) {
      SwalUtil.insert('le nom!');
    } else if (this.employeeCreate.firstName == '' || this.employeeCreate.firstName == undefined) {
      SwalUtil.insert('le prénom!');
    } else if (this.employeeCreate.fonction == undefined || this.employeeCreate.fonction == '') {
      SwalUtil.insert('la fonction!');
    } else if (this.employeeCreate.type == '' || this.employeeCreate.type == undefined) {
      SwalUtil.insert('le type!');
    } else {
      let EmployeeClone = new EmployeeVo(0, this._employeeCreate.matricule, this._employeeCreate.firstName, this._employeeCreate.lastName, this._employeeCreate.fonction, this._employeeCreate.type, false);
      this._employees.push(EmployeeClone);
      this._employeeCreate = new EmployeeVo();
    }
  }

  public reinitialiser() {
    this.employeeCreate = new EmployeeVo();
  }

  public saveEmployee() {
    if (this.employees.length != 0) {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this._http.post(this._url, this._employees).subscribe(
            data => {
              this._employees = new Array<EmployeeVo>();
              this._employeeCreate = new EmployeeVo();
              this.employees = new Array<EmployeeVo>();
              this.findAllEmployesExist();
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    } else {
      SwalUtil.fillTheTable();
    }
  }

  public findAllEmployesExist() {
    this._http.get<Array<EmployeeVo>>(this._url + 'allExist/isExist/' + true).subscribe(
      data => {
        if (data != null) {
          this._employeeSearch = data;
          this._allEmployees = data;
        } else {
          this._employeeSearch = [];
          this._allEmployees = [];
        }
      }
    );
  }

  public findAllEmployeNotExist() {
    this._http.get<Array<EmployeeVo>>(this._url + 'allExist/isExist/' + false).subscribe(
      data => {
        if (data != null) {
          this._employeeSearch = data;
          this._allEmployees = data;
        } else {
          this._employeeSearch = [];
          this._allEmployees = [];
        }
      }
    );
  }

  deleteEmployee(matricule: string) {
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this._http.delete(this._url + 'matricule/' + matricule).subscribe(data => {
            this.findAllEmployesExist();
            SwalUtil.topEndSuccessfully('Suppression');
          }
        );
      }
    });
  }

  revert(matricule: string) {
    this._http.delete(this._url + 'revert/matricule/' + parseInt(matricule)).subscribe(data => {
        this.findAllEmployeNotExist();
      }
    );
  }

  updateEmployee(newEmployee: EmployeeVo) {
    if (this.newEmployee.matricule == '' || this.newEmployee.matricule == undefined) {
      SwalUtil.insert('le matricule!');
    } else if (this.newEmployee.lastName == '' || this.newEmployee.lastName == undefined) {
      SwalUtil.insert('le nom!');
    } else if (this.newEmployee.firstName == '' || this.newEmployee.firstName == undefined) {
      SwalUtil.insert('le prénom!');
    } else if (this.newEmployee.fonction == undefined || this.newEmployee.fonction == '') {
      SwalUtil.insert('la fonction!');
    } else if (this.newEmployee.type == '' || this.newEmployee.type == undefined) {
      SwalUtil.insert('le type!');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this._http.put(this._url, newEmployee).subscribe(data => {
              this.findAllEmployesExist();
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    }
  }

  findEmployeeyId(id: number) {
    this._http.get<EmployeeVo>(this._url + 'id/' + id).subscribe(
      data => {
        this._newEmployee = data;
      }
    );
  }

  employeeSearchChange(value: string) {
    this._employeeSearch = value ? this._allEmployees.filter(e => e.firstName.toLowerCase().includes(value.toLowerCase()) || e.lastName.toLowerCase().includes(value.toLowerCase()) || e.fonction.toLowerCase().includes(value.toLowerCase())) : this._allEmployees;
  }

  countAllEmployees() {
    return this.http.get<number>(this._url + 'numberofemployees');
  }

  get newEmployee(): EmployeeVo {
    return this._newEmployee;
  }

  set newEmployee(value: EmployeeVo) {
    this._newEmployee = value;
  }

  get allEmployees(): Array<EmployeeVo> {
    return this._allEmployees;
  }

  set allEmployees(value: Array<EmployeeVo>) {
    this._allEmployees = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get employeeCreate(): EmployeeVo {
    return this._employeeCreate;
  }

  set employeeCreate(value: EmployeeVo) {
    this._employeeCreate = value;
  }

  get employees(): Array<EmployeeVo> {
    return this._employees;
  }

  set employees(value: Array<EmployeeVo>) {
    this._employees = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get employerSearch(): any {
    return this._employerSearch;
  }

  set employerSearch(value: any) {
    this._employerSearch = value;
  }

  get employeeSearch(): Array<EmployeeVo> {
    return this._employeeSearch;
  }

  set employeeSearch(value: Array<EmployeeVo>) {
    this._employeeSearch = value;
  }
}
