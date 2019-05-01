import {Injectable} from '@angular/core';
import {DetailVo} from '../model/detail.model';
import {Time} from '@angular/common';
import {TimingVo} from '../model/timing.model';
import {HttpClient} from '@angular/common/http';
import {EmployeeVo} from '../model/employee.model';
import Swal from 'sweetalert2';
import {DayVo} from '../model/day.model';

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

  constructor(private _http: HttpClient) {
  }

  public addDetail() {

    if (this.detailCreate.wording === '') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de saisir le libelle!'
      });
    } else if (this.detailCreate.mode === '') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Merci de sélectionner le mode!'
      });
    } else if (this.detailCreate.startingTimeVo.hour == '') {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.detailCreate.startingTimeVo.minute == '') {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes debut!'
      });
    }
    else if (this.detailCreate.endingTimeVo.hour == '') {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir l\'heure debut!'
      });
    }
    else if (this.detailCreate.endingTimeVo.minute == '') {
      Swal.fire({
        type: 'info',
        title: 'Info...',
        text: 'Merci de saisir les minutes fin!'
      });
    }
    else if (this.detailCreate.pan == '') {
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
    this._http.put(this._url, newDetail).subscribe(data => {
        console.log(newDetail);
        this.findAllDetails();
      }, error1 => {
        console.log(error1);
      }
    );
  }

  deleteDetail(wording: string) {
    this.http.delete(this._url + 'wording/' + wording).subscribe(data => {
        console.log(wording);
        this.findAllDetails();
      }, error1 => {
        console.log(error1);
      }
    );

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
