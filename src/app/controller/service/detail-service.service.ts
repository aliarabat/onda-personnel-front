import {Injectable} from '@angular/core';
import {DetailVo} from '../model/detail.model';
import {Time} from '@angular/common';
import {TimingVo} from '../model/timing.model';
import {HttpClient} from '@angular/common/http';
import {EmployeeVo} from '../model/employee.model';
import Swal from 'sweetalert2';
import {DayVo} from '../model/day.model';
import {VacationVo} from '../model/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

  private _url: string = 'http://localhost:8099/personnel-api/personnels/Detail/';
  private _detailCreate: DetailVo = new DetailVo;
  private _details: Array<DetailVo> = [];
  private _allDetails: Array<DetailVo> = [];
  private _he: TimingVo = new TimingVo('00', '00');
  private _hn: TimingVo = new TimingVo('00', '00');
  private _newDetail : DetailVo = new DetailVo();

  constructor(private _http: HttpClient) {
  }

  public addDetail() {

    if (this.detailCreate.wording === '' || this.detailCreate.wording === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le libelle!'
      });
    } else if (this.detailCreate.mode === ''|| this.detailCreate.mode == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de sélectionner le mode!'
      });
    } else if (this.detailCreate.startingTimeVo.hour == '' || this.detailCreate.startingTimeVo.hour == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.detailCreate.startingTimeVo.minute == ''|| this.detailCreate.startingTimeVo.minute == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes debut!'
      });
    }
    else if (this.detailCreate.endingTimeVo.hour == '' ||  this.detailCreate.endingTimeVo.hour == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.detailCreate.endingTimeVo.minute == '' || this.detailCreate.endingTimeVo.minute == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes fin!'
      });
    }
    else if ( this.detailCreate.pan == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir le pan!'
      });
    } else {
      this.getHe();
      this.getHn();
      let detailClone = new DetailVo(this._detailCreate.reference, this._detailCreate.wording, this._detailCreate.startingTimeVo, this._detailCreate.endingTimeVo, this._detailCreate.pan, this._detailCreate.mode);
      this.details.push(detailClone);
      this.detailCreate = new DetailVo();
      console.log(detailClone);
    }
  }


  public getHe() {
    this._http.get<TimingVo>(this.url + 'between/startingHour/' + this.detailCreate.startingTimeVo.hour + '/startingMinute/' + this.detailCreate.startingTimeVo.minute + '/endingHour/' + this.detailCreate.endingTimeVo.hour + '/endingMinute/' + this.detailCreate.endingTimeVo.minute + '/isNight/' + false).subscribe(
      data => {
        this._he = data;
        console.log(this._he);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getHn() {
    this._http.get<TimingVo>(this.url + 'between/startingHour/' + this.detailCreate.startingTimeVo.hour + '/startingMinute/' + this.detailCreate.startingTimeVo.minute + '/endingHour/' + this.detailCreate.endingTimeVo.hour + '/endingMinute/' + this.detailCreate.endingTimeVo.minute + '/isNight/' + true).subscribe(
      data => {
        this._hn = data;
        console.log(this._hn);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public cleanForm() {
    this.detailCreate = new DetailVo();
    this._hn = new TimingVo('00', '00');
    this._he = new TimingVo('00', '00');
  }

  public saveDetails() {
    if (this.details.length != 0) {
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
          this._http.post(this._url, this.details).subscribe(
            data => {
              console.log(this.details);
              this.details = new Array<DetailVo>()
              this.findAllDetails();
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


  public cleanList() {
    this.details = new Array<DetailVo>();
  }


  public findAllDetails() {
    this._http.get<Array<DetailVo>>(this._url).subscribe(
      data => {
        this._allDetails = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  updateDetail(newDetail: DetailVo) {

    if (this.newDetail.wording === '' || this.newDetail.wording === undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le libelle!'
      });
    } else if (this.newDetail.mode === ''|| this.newDetail.mode == undefined ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de sélectionner le mode!'
      });
    } else if (this.newDetail.startingTimeVo.hour == '' || this.newDetail.startingTimeVo.hour == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.newDetail.startingTimeVo.minute == ''|| this.newDetail.startingTimeVo.minute == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes debut!'
      });
    }
  else if (this.newDetail.endingTimeVo.hour == '' ||  this.newDetail.endingTimeVo.hour == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.newDetail.endingTimeVo.minute == '' || this.newDetail.endingTimeVo.minute == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes fin!'
      });
    }
    else if ( this.newDetail.pan == ''||this.newDetail.pan == undefined) {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir le pan!'
      });
    } else{ const swalWithBootstrapButtons = Swal.mixin({
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
          this._http.put(this._url, newDetail).subscribe(data => {
              console.log(newDetail);
              this.findAllDetails();
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
      });}

  }

  deleteDetail(wording: string) {
    this.http.delete(this._url + 'wording/' + wording).subscribe(data => {
        console.log(wording);
        this.findAllDetails();
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
  findDetailById(id:number){
    this._http.get<DetailVo>(this._url+'id/'+id).subscribe(
      data=>{
        this._newDetail = data;
      },error1 => {
        console.log(error1)
      }
    );
  }


  get newDetail(): DetailVo {
    return this._newDetail;
  }

  set newDetail(value: DetailVo) {
    this._newDetail = value;
  }

  get allDetails(): Array<DetailVo> {
    return this._allDetails;
  }

  set allDetails(value: Array<DetailVo>) {
    this._allDetails = value;
  }

  get details(): Array<DetailVo> {
    return this._details;
  }

  set details(value: Array<DetailVo>) {
    this._details = value;
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


  get detailCreate(): DetailVo {
    return this._detailCreate;
  }

  set detailCreate(value: DetailVo) {
    this._detailCreate = value;
  }

  get he(): TimingVo {
    return this._he;
  }

  set he(value: TimingVo) {
    this._he = value;
  }

  get hn(): TimingVo {
    return this._hn;
  }

  set hn(value: TimingVo) {
    this._hn = value;
  }
}
