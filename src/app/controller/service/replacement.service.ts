import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeVo} from '../model/employee.model';
import {ReplacementVo} from '../model/replacement.model';
import {DetailVo} from '../model/detail.model';
import Swal from "sweetalert2";
import {MissionVo} from '../model/mission.model';
import {DayDetailVo} from '../model/day-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ReplacementService {

  constructor(private http:HttpClient) {
  }
  private _url='http://localhost:8099/personnel-api/personnels/dayDetail/';
  private _orgEmployee:EmployeeVo=new EmployeeVo();
  private _rempEmployee:EmployeeVo=new EmployeeVo();
  private _urlEmployee='http://localhost:8099/personnel-api/personnels/employee/';
  private _employee1: EmployeeVo = new EmployeeVo(0,'','','','','',false);
  private _replacement:ReplacementVo=new ReplacementVo();
  private _urlDetail='http://localhost:8099/personnel-api/personnels/Detail/';
  private _dayDetailsRemp: Array<DayDetailVo> = new Array<DayDetailVo>();




  findEmployesByMatricule(matricule:string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        this.orgEmployee= data;
        console.log(this._orgEmployee);
      }, error => {
        console.log(error);
      }
    );
  }

  findReplacedEmployesByMatricule(matricule:string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        this.rempEmployee= data;
        console.log(this._rempEmployee);
      }, error => {
        console.log(error);
      }
    );
  }

  findDetailByWording(wording:string) {
    this.http.get<DetailVo>(this._urlDetail + 'wording/' + wording).subscribe(
      data => {
        this.replacement.detailVo=data;
      }, error => {
        console.log(error);
      }
    );
  }


  saveReplacement(replacement:ReplacementVo,matriculeOrg:string,matriculeRemp:string,wording:string){
    if (replacement.reference === '' || replacement.reference === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la référence de la mission  ",
        type: 'warning',
      });
    } else if (matriculeOrg === '' || matriculeOrg === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'employé considéré ",
        type: 'warning',
      });
    }
    else if (matriculeRemp === '' || matriculeRemp === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'employé remplacant ",
        type: 'warning',
      });
    }

     else if (replacement.replacementDate === '' || replacement.replacementDate === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la date ",
        type: 'warning',
      });
    } else if (replacement.detailVo.wording === '' || replacement.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }
    else if (matriculeRemp === matriculeOrg ) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez bien  choisir les employés ",
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




          this.http.put(this._url + 'replacement/matricule/' + matriculeOrg +'/matricule1/'+ matriculeRemp+'/wordingDetail/' + wording, replacement).subscribe(
            (res) => {
              if (res == 1) {
                this.replacement=new ReplacementVo();
                this.findAlldayDetailsReplacement();

                Swal.fire({
                  title: 'Remplacement effectué',
                  text: 'Modification du service réussite',
                  type: 'success',
                });

              } else if (res == -5 ) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:l'un des employés  n'as pas encore de service à cette date ",
                  type: 'error',
                });
              } else if (res == -4) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:l'un des employés n'as pas encore de service à ce jour là ",
                  type: 'error',
                });
              } else if (res == -3) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:l'un des employés est en vacances  ",
                  type: 'error',
                });
              } else if (res == -2) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:Le remplacant n'est pas libre à cette horaire  ",
                  type: 'error',
                });
              }else if (res == -1) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:l'un des employés est déjà absent pour une raison  ",
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

      });
    }

  }


  deleteAllDayDetailsWhereIsNull(){
    this.http.delete(this.url+'null').subscribe(
      data => {
         console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  findAlldayDetailsReplacement(){
    this.http.get<Array<DayDetailVo>>(this._url+"replacement/" ).subscribe(
      data => {
        console.log(data);
        this.dayDetailsRemp = data;
        console.log(this._dayDetailsRemp);
      }, error => {
        console.log(error);
      }
    );
  }


  deleteReplacement(dayDetail:DayDetailVo){
    Swal.fire({
      title: 'Suppression',
      text: "Vous êtes sûr de vouloir Supprimer ce service",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#377bd6',
      cancelButtonText:'Annuler',

      cancelButtonColor: '#dd0009',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.value) {




        this.http.put(this._url+'replacement/id/'+dayDetail.id,dayDetail).subscribe(
          (res) => {
            if (res == 1) {
              console.log(dayDetail.id);
              this.findAlldayDetailsReplacement();

              Swal.fire({
                title: 'Suppression du remplacement',
                text: 'Suppression du service réussite',
                type: 'success',
              });

            }  else {
              console.log(dayDetail.id);
              console.log(this._url);

              Swal.fire({
                title: 'Erreur!',
                text: "Suppression du service échouée:Erreur Inconnue  ",
                type: 'error',
              });
            }

          },
        );


      }

    });

  }
  formInit(){
    this.replacement=new ReplacementVo();
    this.orgEmployee=new EmployeeVo();
    this.rempEmployee=new EmployeeVo();
  }

  get orgEmployee(): EmployeeVo {
    return this._orgEmployee;
  }

  set orgEmployee(value: EmployeeVo) {
    this._orgEmployee = value;
  }

  get rempEmployee(): EmployeeVo {
    return this._rempEmployee;
  }

  set rempEmployee(value: EmployeeVo) {
    this._rempEmployee = value;
  }

  get urlEmployee(): string {
    return this._urlEmployee;
  }

  set urlEmployee(value: string) {
    this._urlEmployee = value;
  }

  get replacement(): ReplacementVo {
    return this._replacement;
  }

  set replacement(value: ReplacementVo) {
    this._replacement = value;
  }

  get urlDetail(): string {
    return this._urlDetail;
  }

  set urlDetail(value: string) {
    this._urlDetail = value;
  }

  get employee1(): EmployeeVo {
    return this._employee1;
  }

  set employee1(value: EmployeeVo) {
    this._employee1 = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }


  get dayDetailsRemp(): Array<DayDetailVo> {
    return this._dayDetailsRemp;
  }

  set dayDetailsRemp(value: Array<DayDetailVo>) {
    this._dayDetailsRemp = value;
  }
}
