import {Injectable} from '@angular/core';
import {DetailVo} from '../model/detail.model';
import {TimingVo} from '../model/timing.model';
import {HttpClient} from '@angular/common/http';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

  public _url: string = UrlsUtil.main_personnel_url + UrlsUtil.url_Detail;
  public _detailCreate: DetailVo = new DetailVo;
  public _details: Array<DetailVo> = [];
  public _allDetails: Array<DetailVo> = [];
  public _he: TimingVo = new TimingVo('00', '00');
  public _hn: TimingVo = new TimingVo('00', '00');
  public _newDetail: DetailVo = new DetailVo();

  constructor(private _http: HttpClient) {
  }

  public addDetail() {
    if (this.detailCreate.wording === '' || this.detailCreate.wording === undefined) {
      SwalUtil.insert('le libelle!');
    } else if (this.detailCreate.mode === '' || this.detailCreate.mode == undefined) {
      SwalUtil.select('le mode!');
    } else if (this.detailCreate.startingTimeVo.hour == '' || this.detailCreate.startingTimeVo.hour == undefined) {
      SwalUtil.insert('l\'heure debut!');
    } else if (this.detailCreate.startingTimeVo.minute == '' || this.detailCreate.startingTimeVo.minute == undefined) {
      SwalUtil.insert('les minutes début!');
    } else if (this.detailCreate.endingTimeVo.hour == '' || this.detailCreate.endingTimeVo.hour == undefined) {
      SwalUtil.insert('l\'heure début!');
    } else if (this.detailCreate.endingTimeVo.minute == '' || this.detailCreate.endingTimeVo.minute == undefined) {
      SwalUtil.insert('les minutes fin!');
    } else if (this.detailCreate.pan == undefined) {
      SwalUtil.insert('le pan!');
    } else {
      this.getHe();
      this.getHn();
      let detailClone = new DetailVo(this._detailCreate.reference, this._detailCreate.wording, this._detailCreate.startingTimeVo, this._detailCreate.endingTimeVo, this._detailCreate.pan, this._detailCreate.mode);
      this.details.push(detailClone);
      this.detailCreate = new DetailVo();
    }
  }

  public getHe() {
    this._http.get<TimingVo>(this.url + 'between/startingHour/' + this.detailCreate.startingTimeVo.hour + '/startingMinute/' + this.detailCreate.startingTimeVo.minute + '/endingHour/' + this.detailCreate.endingTimeVo.hour + '/endingMinute/' + this.detailCreate.endingTimeVo.minute + '/isNight/' + false).subscribe(
      data => {
        data ? this._he = data : this._he = new TimingVo('00', '00');
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getHn() {
    this._http.get<TimingVo>(this.url + 'between/startingHour/' + this.detailCreate.startingTimeVo.hour + '/startingMinute/' + this.detailCreate.startingTimeVo.minute + '/endingHour/' + this.detailCreate.endingTimeVo.hour + '/endingMinute/' + this.detailCreate.endingTimeVo.minute + '/isNight/' + true).subscribe(
      data => {
        data ? this._hn = data : this._hn = new TimingVo('00', '00');
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
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this._http.post(this._url, this.details).subscribe(
            data => {
              this.details = new Array<DetailVo>();
              this.findAllDetails();
            }, error1 => {
              console.log(error1);
            }
          );
          SwalUtil.savedSuccessfully('Sauvegarde');
        }
      });
    } else {
      SwalUtil.fillTheTable();
    }
  }

  public cleanList() {
    this.details = new Array<DetailVo>();
  }

  public findAllDetails() {
    this._http.get<Array<DetailVo>>(this._url).subscribe(
      data => {
        data ? this._allDetails = data : this._allDetails = [];
      }, error1 => {
        console.log(error1);
      }
    );
  }

  updateDetail(newDetail: DetailVo) {
    if (this.newDetail.wording === '' || this.newDetail.wording === undefined) {
      SwalUtil.insert('le libelle!');
    } else if (this.newDetail.mode === '' || this.newDetail.mode == undefined) {
      SwalUtil.select('le mode!');
    } else if (this.newDetail.startingTimeVo.hour == '' || this.newDetail.startingTimeVo.hour == undefined) {
      SwalUtil.insert('l\'heure debut!');
    } else if (this.newDetail.startingTimeVo.minute == '' || this.newDetail.startingTimeVo.minute == undefined) {
      SwalUtil.insert('les minutes debut!');
    } else if (this.newDetail.endingTimeVo.hour == '' || this.newDetail.endingTimeVo.hour == undefined) {
      SwalUtil.insert('l\'heure fin!');
    } else if (this.newDetail.endingTimeVo.minute == '' || this.newDetail.endingTimeVo.minute == undefined) {
      SwalUtil.insert('les minutes fin!');
    } else if (this.newDetail.pan == '' || this.newDetail.pan == undefined) {
      SwalUtil.insert('le pan!');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this._http.put(this._url, newDetail).subscribe(data => {
              this.findAllDetails();
            }, error1 => {
              console.log(error1);
            }
          );
          SwalUtil.savedSuccessfully('Modification');
        }
      });
    }

  }

  deleteDetail(wording: string) {
    this.http.delete(this._url + 'wording/' + wording).subscribe(data => {
        this.findAllDetails();
        SwalUtil.topEndSavedSuccessfully();
      }, error1 => {
        console.log(error1);
      }
    );

  }

  findDetailById(id: number) {
    this._http.get<DetailVo>(this._url + 'id/' + id).subscribe(
      data => {
        data ? this._newDetail = data : this._newDetail = new DetailVo();
      }, error1 => {
        console.log(error1);
      }
    );
  }

  countAllHours() {
    return this.http.get<number>(this.url + 'countdetailwordings');
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
