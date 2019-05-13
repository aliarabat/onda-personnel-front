import {Injectable} from '@angular/core';
import {EmployeeVo} from '../model/employee.model';
import {DetailVo} from '../model/detail.model';
import {HttpClient} from '@angular/common/http';
import Swal from "sweetalert2";
import {VacationVo} from '../model/vacation.model';
import {SkipVo} from '../model/skip.model';
import {DayDetailVo} from '../model/day-detail.model';
import {DayVo} from '../model/day.model';

@Injectable({
  providedIn: 'root'
})
export class SkipService {
  private _url = "http://localhost:8099/personnel-api/personnels/";
  private _urlDay='http://localhost:8099/personnel-api/personnels/day/';
  private _urlSkip='http://localhost:8099/personnel-api/personnels/skip/';

  private _url_employees = this._url + "employee/";
  private _url_detail = this._url + "Detail/";
  private _url_skip = this._url + "dayDetail/skip/";
  private _url_dayDetail= this._url + "dayDetail/"
  private _employee: EmployeeVo = new EmployeeVo();
  private _detail: DetailVo = new DetailVo('', '', {}, {}, '', '');
  private _employees: Array<EmployeeVo> = new Array<EmployeeVo>();
  private _details: Array<DetailVo> = new Array<DetailVo>();
  private _skipCreate : SkipVo = new SkipVo();
  private _dayDetails : Array<DayDetailVo> = new Array<DayDetailVo>();
  private _employee1: EmployeeVo = new EmployeeVo(0,'','','','','',false);
  private _detail1: DetailVo = new DetailVo('', '', {}, {}, '', '');
  private _skipInit:SkipVo=new SkipVo(0,'',this._employee1,'','',new DetailVo());
  private _selectedDayDetail:DayDetailVo=new DayDetailVo(0,this._detail1,null,this._skipInit,null);
  constructor(private _http: HttpClient) {
  }


  findAllEmployees() {
    this._http.get<Array<EmployeeVo>>(this._url_employees + "allExist/isExist/" + true).subscribe(
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
    this._http.get<Array<DetailVo>>(this._url_detail).subscribe(
      data => {
        if (data != null) {
          this._details = data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  public saveSkip() {
    if (this.employee.matricule === '' ||this.employee.matricule === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de selctionee l\'employee!'
      });
    } else if (this.skipCreate.type === ''|| this.skipCreate.type === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le type de skip!'
      });
    } else if (this.skipCreate.skipDate == '' || this.skipCreate.skipDate == undefined ) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir la date de skip'
      });
    }
    else if (this._detail.wording == '' || this._detail.wording == undefined ) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de selectioner l\'horaire!'
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

          this._http.put(this._url_skip + 'matricule/' + this.employee.matricule+'/wordingDetail/'+this.detail.wording, this._skipCreate).subscribe(
            data => {
              console.log(data)
              this._employee = new EmployeeVo();
              this._detail = new DetailVo();
              this.findAllSkips();
              this.deleteAllDayDetailsWhereIsNull();
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

    }}

  findAllSkips(){
    this._http.get<Array<DayDetailVo>>(this._url_dayDetail).subscribe(
      data=>{
        this._dayDetails = data;
      },error1 => {
        console.log(error1)
      }
    )
  }


  findDetailByWording(wording:string) {
    this.http.get<DetailVo>(this._url_detail + 'wording/' + wording).subscribe(
      data => {
        if(data!=null){
          this.selectedDayDetail.skipVo.detailVo=data;
          this.selectedDayDetail.detailVo=data;
        }

      }, error => {
        console.log(error);
      }
    );
  }

  deleteSkip(id:number){
    this.http.delete(this._url_dayDetail+"id/"+id).subscribe(
      data=>{
        this.findAllSkips()
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

  findDayDetailById(id:number){
    this.http.get<DayDetailVo>(this._url_dayDetail + "id/" + id).subscribe(
      data => {
        if (data != null) {
        this.selectedDayDetail=data;
        console.log(this._selectedDayDetail);
        }

      }, error => {
        console.log(error);
      }
    );
  }




  updateSkip(dayDetail:DayDetailVo){

    if (dayDetail.skipVo.type === '' || dayDetail.skipVo.type === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir le type d'absence ",
        type: 'warning',
      });
    } else if (dayDetail.skipVo.skipDate === '' || dayDetail.skipVo.skipDate === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la date ",
        type: 'warning',
      });
    } else if ( dayDetail.detailVo.wording=== '' || dayDetail.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }
    else{
      Swal.fire({
        title: 'Modification',
        text: "Vous êtes sûr de la modification",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6d20b',
        cancelButtonText:'Annuler',

        cancelButtonColor: '#d33',
        confirmButtonText: 'Modifier'
      }).then((result) => {
        if (result.value) {
          this.http.get<DayVo>(this._urlDay + "matricule/" + dayDetail.skipVo.employeeVo.matricule+"/dayDate/"+dayDetail.skipVo.skipDate).subscribe(
            data => {
              if (data == null) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Erreur: Cet employé n'as pas encore de service à cette date ",
                  type: 'error',
                });
              } else{
                this.http.put(this._urlSkip, dayDetail).subscribe(
                  (res) => {
                    if (res == 1 || res==2 || res==3 || res==7) {
                      this.findAllSkips();
                      this.deleteAllDayDetailsWhereIsNull();

                      Swal.fire({
                        title: "Modification d'absence",
                        text: 'Modification du service réussite',
                        type: 'success',
                      });
                      // @ts-ignore
                      $('#skipModal').modal('hide')


                    } else if (res == -2) {
                      Swal.fire({
                        title: 'Erreur!',
                        text: "Modification du service échouée:Ce fonctionnaire n'a pas de service à cette date  ",
                        type: 'error',
                      });
                    }else if (res == -6 || res==-7) {
                      Swal.fire({
                        title: 'Erreur!',
                        text: "Modification du service échouée:Ce fonctionnaire est absent à cette date  ",
                        type: 'error',
                      });
                    }

                    else {
                      Swal.fire({
                        title: 'Erreur!',
                        text: "Modification du service échouée:Erreur Inconnue  ",
                        type: 'error',
                      });
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

  deleteAllDayDetailsWhereIsNull(){
    this.http.delete(this._url_dayDetail+'null').subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
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
}
