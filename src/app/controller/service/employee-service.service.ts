import {Injectable} from '@angular/core';
import {EmployeeVo} from '../model/employee.model';
import {HttpClient} from '@angular/common/http';
import {error} from 'selenium-webdriver';
import Swal from 'sweetalert2';
import {VacationVo} from '../model/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private _url: string = 'http://localhost:8099/personnel-api/personnels/employee/';

  private _employeeCreate: EmployeeVo = new EmployeeVo();
  private _employees: Array<EmployeeVo> = [];
  private _allEmployees: Array<EmployeeVo> = [];
 private _newEmployee : EmployeeVo = new EmployeeVo();

  constructor(private _http: HttpClient) {
  }


  public addEmployee() {
    if (this.employeeCreate.matricule == '' || this.employeeCreate.matricule == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le matricule!'
      });
    }
    else if (this.employeeCreate.lastName == '' || this.employeeCreate.lastName == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le nom!'
      });
    }
    else if (this.employeeCreate.firstName == '' || this.employeeCreate.firstName == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le prenom!'
      });
    }
    else if (this.employeeCreate.fonction == undefined || this.employeeCreate.fonction == '' ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir la fonction!'
      });
    }    else if (this.employeeCreate.type == '' || this.employeeCreate.type == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le type!'
      });
    }else {
      let EmployeeClone = new EmployeeVo(0, this._employeeCreate.matricule, this._employeeCreate.firstName, this._employeeCreate.lastName, this._employeeCreate.fonction, this._employeeCreate.type, false);
      this._employees.push(EmployeeClone);
      this._employeeCreate = new EmployeeVo();
      console.log(EmployeeClone);
    }
  }

  public reinitialiser() {
    this.employeeCreate = new EmployeeVo();
  }

  public saveEmployee() {
    if (this.employees.length != 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-danger mr-1'
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        type: 'info',
        title: 'voulez vous souvgarger',
        showCancelButton: true,
        confirmButtonText: 'Yes, confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this._http.post(this._url, this._employees).subscribe(
            data => {
              console.log(this._employees);
              this._employees = new Array<EmployeeVo>();
              this._employeeCreate = new EmployeeVo();
              this.employees = new Array<EmployeeVo>();
              this.findAllEmployesExist();
            }, error1 => {
              console.log(error1);
            }
          );
          swalWithBootstrapButtons.fire(
            'Sauvegardé!',
            'Vos infos sont sauvegardées',
            'success'
          );
        }
      });
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error...',
        text: 'Merci de remplir le tableau'
      });
    }
  }

  public findAllEmployesExist() {
    this._http.get<Array<EmployeeVo>>(this._url + 'allExist/isExist/' + true).subscribe(
      data => {
        this._allEmployees = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public findAllEmployeNotExist() {
    this._http.get<Array<EmployeeVo>>(this._url + 'allExist/isExist/' + false).subscribe(
      data => {
        this._allEmployees = data;
        console.log(this._allEmployees);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  deleteEmployee(matricule: string) {
    this._http.delete(this._url + 'matricule/' + parseInt(matricule)).subscribe(data => {
        console.log(matricule);
        this.findAllEmployesExist();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'success',
        title: 'Supression avec succés'
      })
      }, error1 => {
        console.log(error1);
      }
    );

  }
  revert(matricule:string){
    this._http.delete(this._url + 'revert/matricule/' + parseInt(matricule)).subscribe(data => {
        this.findAllEmployeNotExist()

      }
    )
  }

  updateEmployee(newEmployee: EmployeeVo) {
    if (this.newEmployee.matricule == '' || this.newEmployee.matricule == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le matricule!'
      });
    }
    else if (this.newEmployee.lastName == '' || this.newEmployee.lastName == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le nom!'
      });
    }
    else if (this.newEmployee.firstName == '' || this.newEmployee.firstName == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le prenom!'
      });
    }
    else if (this.newEmployee.fonction == undefined || this.newEmployee.fonction == '' ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir la fonction!'
      });
    }    else if (this.newEmployee.type == '' || this.newEmployee.type == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le type!'
      });
    }else {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-danger mr-1'
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        type: 'info',
        title: 'voulez vous Modifier',
        showCancelButton: true,
        confirmButtonText: 'Yes, confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this._http.put(this._url, newEmployee).subscribe(data => {
              console.log(EmployeeVo);
              this.findAllEmployesExist();
            }, error1 => {
              console.log(error1);
            }
          );
          swalWithBootstrapButtons.fire(
            'Modification!',
            'Modification avec success ',
            'success'
          );
        }
      });

    }

  }

  findEmployeeyId(id:number){
    this._http.get<EmployeeVo>(this._url+'id/'+id).subscribe(
      data=>{
        this._newEmployee = data;
      },error1 => {
        console.log(error1)
      }
    );
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
}
