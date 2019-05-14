import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Swal from "sweetalert2";
import {MissionVo} from '../model/mission.model';
import {DayServiceService} from './day-service.service';
import {EmployeeVo} from '../model/employee.model';
import {DetailVo} from '../model/detail.model';
import {DayVo} from '../model/day.model';
import {DayDetailVo} from '../model/day-detail.model';
import {WorkVo} from '../model/work.model';



@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http:HttpClient) {
  }
  private _url='http://localhost:8099/personnel-api/personnels/dayDetail/';
  private _urlDay='http://localhost:8099/personnel-api/personnels/day/';
  private _urlEmployee='http://localhost:8099/personnel-api/personnels/employee/';
  private _urlWork='http://localhost:8099/personnel-api/personnels/work/';
  private _urlMission='http://localhost:8099/personnel-api/personnels/mission/';
  private _urlDetail='http://localhost:8099/personnel-api/personnels/Detail/';


  private _dayService:DayServiceService;
  private _theDay:DayVo=new DayVo();
  private _dayDetails: Array<DayDetailVo> = new Array<DayDetailVo>();
  private _dayDetails1: Array<DayDetailVo> = new Array<DayDetailVo>();
  private _details: Array<DetailVo> = new Array<DetailVo>();
  private _theEmployee:EmployeeVo=new EmployeeVo();
  private _works: Array<WorkVo> = new Array<WorkVo>();
  private _theDayDetail1:DayDetailVo=new DayDetailVo();
  private _employee1: EmployeeVo = new EmployeeVo(0,'','','','','',false);
  private _detail1: DetailVo = new DetailVo('', '', {}, {}, '', '');
  private _missionInit:MissionVo=new MissionVo();
  private _theDayDetail:DayDetailVo=new DayDetailVo(0,this._detail1,null,null,this._missionInit);
  private _mission:MissionVo=new MissionVo();

  updateMission(dayDetail:DayDetailVo){
    if (dayDetail.missionVo.reference === '' || dayDetail.missionVo.reference === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la référence de la mission  ",
        type: 'warning',
      });
    }
    /*else if (dayDetail.missionVo.employee.matricule === '' || dayDetail.missionVo.employee.matricule === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'employé considéré ",
        type: 'warning',
      });
    } */else if (dayDetail.missionVo.type === '' || dayDetail.missionVo.type === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir le type de mission ",
        type: 'warning',
      });
    } else if (dayDetail.missionVo.startingDate === '' || dayDetail.missionVo.startingDate === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la date ",
        type: 'warning',
      });
    } /*else if ( dayDetail.detailVo.wording=== '' || dayDetail.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }*/


    else if (dayDetail.missionVo.startingTimeVo.hour === '' || dayDetail.missionVo.startingTimeVo.hour === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir l'heure début ",
        type: 'warning',
      });
    }
    else if (dayDetail.missionVo.startingTimeVo.minute === '' || dayDetail.missionVo.startingTimeVo.minute === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir en minutes l'horaire ",
        type: 'warning',
      });
    }
    else if (dayDetail.missionVo.endingTimeVo.hour === '' || dayDetail.missionVo.endingTimeVo.hour === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir l'heure fin ",
        type: 'warning',
      });
    }
    else if (dayDetail.missionVo.endingTimeVo.minute === '' || dayDetail.missionVo.endingTimeVo.minute === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir en minutes l'horaire ",
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
          this.http.get<DayVo>(this._urlDay + "matricule/" + dayDetail.missionVo.employee.matricule+"/dayDate/"+dayDetail.missionVo.startingDate).subscribe(
            data => {
              if (data == null) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Erreur: Cet employé n'as pas encore de service à cette date ",
                  type: 'error',
                });
              } else{
                this.http.put(this._urlMission, dayDetail).subscribe(
                  (res) => {
                    if (res == 1 || res==2 || res==3 || res==7) {
                      this.findAlldayDetails();
                      this.deleteAllDayDetailsWhereIsNull();

                      Swal.fire({
                        title: 'Modification de Mission',
                        text: 'Modification du service réussite',
                        type: 'success',
                      });
                      // @ts-ignore
                      $('#missionModal').modal('hide')


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

  findDayDetailById(id:number){
    this.http.get<DayDetailVo>(this._url + "id/" + id).subscribe(
      data => {
        if (data != null) {
          this.theDayDetail = data;
          this.theDayDetail1=data;
          console.log(this._theDayDetail);
        }

      }, error => {
        console.log(error);
      }
    );
  }


  SaveMission(mission:MissionVo,matricule:string){

    if (mission.reference === '' || mission.reference === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la référence de la mission  ",
        type: 'warning',
      });
    } else if (matricule === '' || matricule === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'employé considéré ",
        type: 'warning',
      });
    } else if (mission.type === '' || mission.type === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir le type de mission ",
        type: 'warning',
      });
    } else if (mission.startingDate === '' || mission.startingDate === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir la date ",
        type: 'warning',
      });
    } /*else if (mission.detailVo.wording === '' || mission.detailVo.wording === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez choisir l'horaire d'absence ",
        type: 'warning',
      });
    }*/

    else if (mission.startingTimeVo.hour === '' || mission.startingTimeVo.hour === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir l'heure début ",
        type: 'warning',
      });
    }
    else if (mission.startingTimeVo.minute === '' || mission.startingTimeVo.minute === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir en minutes l'horaire ",
        type: 'warning',
      });
    }
    else if (mission.endingTimeVo.hour === '' || mission.endingTimeVo.hour === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir l'heure fin ",
        type: 'warning',
      });
    }
    else if (mission.endingTimeVo.minute === '' || mission.endingTimeVo.minute === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir en minutes l'horaire ",
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




          this.http.put(this._url + 'mission/matricule/' + matricule, mission).subscribe(
            (res) => {
              if (res == 1) {
                this.mission=new MissionVo();
                this.findAlldayDetails();

                Swal.fire({
                  title: 'Ajout de Mission',
                  text: 'Modification du service réussite',
                  type: 'success',
                });

              } else if (res == -4) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:Cet employé n'as pas encore de service à cette date ",
                  type: 'error',
                });
              } else if (res == -6) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:Cet employé n'as pas encore de service à ce jour là ",
                  type: 'error',
                });
              } else if (res == -3) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:Cet employé est en vacances  ",
                  type: 'error',
                });
              } else if (res == -2) {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du service échouée:Cet employé est déjà absent pour une raison  ",
                  type: 'error',
                });
              } else {
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

  formInit(){
    this.mission=new MissionVo();
    //this._dayService.employee=new EmployeeVo();
    //this._dayService.detail=new DetailVo();

  }
  findDayDetailsOfDay(matricule:string,dateDay:string){

    this.http.get<DayVo>(this._urlDay + "matricule/" + matricule+"/dayDate/"+dateDay).subscribe(
      data => {
        if (data != null) {
          //this.findEmployesByMatricule(matricule);
          this.theDay = data;
          // console.log(this._theDay);
          this.dayDetails = data.dayDetailsVo;
          //console.log(this._dayDetails);
        } else{
          Swal.fire({
            title: 'Erreur!',
            text: "Aucun service trouvé : Cet employé n'as pas encore de service à cette date ",
            type: 'error',
          });
        }

      }, error => {
        console.log(error);
      }
    );

  }

  findAllWorks(){
    this.http.get<Array<WorkVo>>(this._urlWork ).subscribe(
      data => {
        this.works = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findAlldayDetails(){
    this.http.get<Array<DayDetailVo>>(this._url+"Mission/" ).subscribe(
      data => {
        console.log(data);
        this.dayDetails1 = data;
        console.log(this._dayDetails1);
      }, error => {
        console.log(error);
      }
    );
  }

  findEmployesByMatricule(matricule:string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        this.theEmployee = data;
        this.theDayDetail.missionVo.employee=data;
      }, error => {
        console.log(error);
      }
    );
  }
  findDetailByWording(wording:string) {
    this.http.get<DetailVo>(this._urlDetail + 'wording/' + wording).subscribe(
      data => {
        this.theDayDetail.detailVo= data;
      }, error => {
        console.log(error);
      }
    );
  }

  deleteMission(dayDetail:DayDetailVo){
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




        this.http.put(this._url+'mission/id/'+dayDetail.id,dayDetail).subscribe(
          (res) => {
            if (res == 1) {
              console.log(dayDetail.id);
              this.findAlldayDetails();
              this.deleteAllDayDetailsWhereIsNull();

              Swal.fire({
                title: 'Suppression de la Mission',
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


  getTheDayDetail(dayDetail:DayDetailVo){
    this._theDayDetail=dayDetail;
    console.log(this._theDayDetail);
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get mission(): MissionVo {
    return this._mission;
  }

  set mission(value: MissionVo) {
    this._mission = value;
  }


  get dayService(): DayServiceService {
    return this._dayService;
  }

  set dayService(value: DayServiceService) {
    this._dayService = value;
  }

  get urlDay(): string {
    return this._urlDay;
  }

  set urlDay(value: string) {
    this._urlDay = value;
  }

  get theDay(): DayVo {
    return this._theDay;
  }

  set theDay(value: DayVo) {
    this._theDay = value;
  }


  get dayDetails(): Array<DayDetailVo> {
    return this._dayDetails;
  }

  set dayDetails(value: Array<DayDetailVo>) {
    this._dayDetails = value;
  }


  get urlEmployee(): string {
    return this._urlEmployee;
  }

  set urlEmployee(value: string) {
    this._urlEmployee = value;
  }

  get theEmployee(): EmployeeVo {
    return this._theEmployee;
  }

  set theEmployee(value: EmployeeVo) {
    this._theEmployee = value;
  }


  get details(): Array<DetailVo> {
    return this._details;
  }

  set details(value: Array<DetailVo>) {
    this._details = value;
  }


  get urlWork(): string {
    return this._urlWork;
  }

  set urlWork(value: string) {
    this._urlWork = value;
  }

  get works(): Array<WorkVo> {
    return this._works;
  }

  set works(value: Array<WorkVo>) {
    this._works = value;
  }


  get theDayDetail(): DayDetailVo {
    return this._theDayDetail;
  }

  set theDayDetail(value: DayDetailVo) {
    this._theDayDetail = value;
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


  get dayDetails1(): Array<DayDetailVo> {
    return this._dayDetails1;
  }

  set dayDetails1(value: Array<DayDetailVo>) {
    this._dayDetails1 = value;
  }

  get theDayDetail1(): DayDetailVo {
    return this._theDayDetail1;
  }

  set theDayDetail1(value: DayDetailVo) {
    this._theDayDetail1 = value;
  }

  get urlMission(): string {
    return this._urlMission;
  }

  set urlMission(value: string) {
    this._urlMission = value;
  }

  get missionInit(): MissionVo {
    return this._missionInit;
  }

  set missionInit(value: MissionVo) {
    this._missionInit = value;
  }

  get urlDetail(): string {
    return this._urlDetail;
  }

  set urlDetail(value: string) {
    this._urlDetail = value;
  }

  deleteAllDayDetailsWhereIsNull(){
    this.http.delete(this._url+'null').subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
}
