import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VacationVo} from '../model/vacation.model';
import {EmployeeVo} from '../model/employee.model';
import Swal from "sweetalert2";
import {DetailVo} from '../model/detail.model';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private _vacationCreate: VacationVo = new VacationVo();
  private _url = 'http://localhost:8099/personnel-api/personnels/day/vacation/';
  private _urlVac = 'http://localhost:8099/personnel-api/personnels/vacation/';
  private _url_employees = 'http://localhost:8099/personnel-api/personnels/employee/';
  private _employee: EmployeeVo = new EmployeeVo(0,'','','','','',true);
  private _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  private _vacations : Array<VacationVo> = new Array<VacationVo>();
  private _newVacation : VacationVo = new VacationVo(0,new EmployeeVo(),'','','','')

  constructor(private _http: HttpClient) {
  }

  public saveVacation() {
    if (this.employee.matricule === '' ||this.employee.matricule === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de selctionee l\'employee!'
      });
    } else if (this.vacationCreate.startingDate === '' ||this.vacationCreate.startingDate === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir la date debut!'
      });
    } else if (this.vacationCreate.endingDate == '' || this.vacationCreate.endingDate == undefined ) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir la date fin'
      });
    }
    else if (this.vacationCreate.type == '' || this.vacationCreate.type == undefined ) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de selectioner le type de conge!'
      });
    }else{
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

        this._http.post(this._url + 'matricule/' + parseInt(this._employee.matricule), this._vacationCreate).subscribe(
          data => {
            console.log(data);
            this._vacationCreate = new VacationVo();
            this.findAllEmployees();
            this.findAllVacations();
          }, error=> {
            console.log(error);
          }
        );
        swalWithBootstrapButtons.fire(
          'Sauvegardé!',
          'Vos infos sont sauvegardées',
          'success'
        );
      }
    });

  }}

  findAllEmployees() {
    this.http.get<Array<EmployeeVo>>(this._url_employees + 'allExist/isExist/' + true).subscribe(
      data => {
        if (data != null) {
          this._employees = data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  findAllVacations(){
    this.http.get<Array<VacationVo>>(this._urlVac).subscribe(
      data=>{
        this._vacations = data;
      },error=>{
        console.log(error)
      }
    );
  }

  deleteVaction(id:number){
    this.http.delete(this.urlVac+"/id/"+id).subscribe(
      data=>{
        this.findAllVacations()
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

      },error1 => {
        console.log(error1)
      }
    )
  }

  updateEmployee(newVacation: VacationVo , matricule:string) {
    this._http.put(this._url + 'matricule/' + matricule, newVacation).subscribe(data => {
        this.findAllVacations();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Sauvegardé avec succés'
        })
      }, error1 => {
        console.log(error1);
      }
    );
  }

  findVacationById(id:number){
    this._http.get<VacationVo>(this._url+'id/'+id).subscribe(
      data=>{
        this._newVacation = data;
      },error1 => {
        console.log(error1)
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
