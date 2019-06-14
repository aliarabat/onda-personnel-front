import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HolidayVo} from '../model/holiday.model';
//import * as $ from 'jquery';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  constructor(private http: HttpClient) {
  }

  public _url = UrlsUtil.main_personnel_url + UrlsUtil.url_holiday;
  public _holidayCreate: HolidayVo = new HolidayVo(0, '', '', '');
  public _holidaysVo: Array<HolidayVo> = new Array<HolidayVo>();
  public _holidaysList: Array<HolidayVo> = new Array<HolidayVo>();
  public _holidayVoToUpdate: HolidayVo = new HolidayVo(0, '', '', '');

  public _holidaysNumber: Array<number> = [];

  addHoliday() {
    if (this._holidayCreate.reference === '') {
      SwalUtil.insert('le référence');
    } else if (this._holidayCreate.startingDate === '') {
      SwalUtil.insert('la date début');
    } else if (this._holidayCreate.endingDate === '') {
      SwalUtil.insert('la date fin');
    } else if (new Date(this._holidayCreate.startingDate)>new Date(this._holidayCreate.endingDate)) {
      SwalUtil.select("des dates valides");
    } else {
      if (this._holidaysVo.findIndex(hVo => hVo.reference === this._holidayCreate.reference) !== -1 || this._holidaysList.findIndex(hVo => hVo.reference === this._holidayCreate.reference) !== -1) {
        SwalUtil.alreadyExist('Ce référence');
      } else {
        this._holidaysVo.push(this._holidayCreate);
        this._holidayCreate = new HolidayVo(0, '', '', '');
      }
    }
  }

  reinitializeForm() {
    this._holidayCreate = new HolidayVo(0, '', '', '');
  }

  substructHoliday(h: HolidayVo) {
    let index = this._holidaysVo.indexOf(h);
    if (index !== -1) {
      this._holidaysVo.splice(index, 1);
    }
  }

  confirm() {
    if (this._holidaysVo.length === 0) {
      SwalUtil.fillTheTable();
    } else {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this.http.post(this._url, this._holidaysVo).subscribe(
            data => {
              if (data === 1) {
                this.findAll();
                this._holidaysVo = new Array<HolidayVo>();
                SwalUtil.savedSuccessfully('Sauvegarde');
              }
            }
          );
        }
      });

    }
  }

  findAll() {
    this.http.get<Array<HolidayVo>>(this._url).subscribe(data => data ? this._holidaysList = data : this._holidaysList = []);
  }

  updateHoliday(hol: HolidayVo) {
    this.checkHolidayVoAttrs(hol);
    SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
      if (result.value) {
        this.http.put<HolidayVo>(this._url, this._holidayVoToUpdate).subscribe(
          data => {
            if (data === 1) {
              // @ts-ignore
              $('#updateHolidayModal').modal('hide');
              this.findAll();
              this._holidayVoToUpdate = new HolidayVo(0, '', '', '');
              SwalUtil.topEndSuccessfully('Mise à jour');
            }
          }
        );
      }
    });
  }

  private checkHolidayVoAttrs(hol: HolidayVo) {
    this._holidayVoToUpdate.id = hol.id;
    if (this._holidayVoToUpdate.reference === '') {
      this._holidayVoToUpdate.reference = hol.reference;
    }
    if (this._holidayVoToUpdate.startingDate === '') {
      this._holidayVoToUpdate.startingDate = hol.startingDate;
    }
    if (this._holidayVoToUpdate.endingDate === '') {
      this._holidayVoToUpdate.endingDate = hol.endingDate;
    }
  }

  deleteHoliday(id: number) {
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this.http.delete(this._url + 'id/' + id).subscribe();
        this._holidaysList = this._holidaysList.filter(h => h.id !== id);
        SwalUtil.savedSuccessfully('Suppression');
      }
    });
  }

  reinitializeList() {
    this._holidaysVo = new Array<HolidayVo>();
  }

  countAllHolidays() {
    return this.http.get<number>(this._url + 'countholidays');
  }

  get holidayCreate(): HolidayVo {
    return this._holidayCreate;
  }

  set holidayCreate(value: HolidayVo) {
    this._holidayCreate = value;
  }

  get holidaysVo(): Array<HolidayVo> {
    return this._holidaysVo;
  }

  set holidaysVo(value: Array<HolidayVo>) {
    this._holidaysVo = value;
  }

  get holidaysList(): Array<HolidayVo> {
    return this._holidaysList;
  }

  set holidaysList(value: Array<HolidayVo>) {
    this._holidaysList = value;
  }

  get holidayVoToUpdate(): HolidayVo {
    return this._holidayVoToUpdate;
  }

  set holidayVoToUpdate(value: HolidayVo) {
    this._holidayVoToUpdate = value;
  }

  get holidaysNumber(): Array<number> {
    return this._holidaysNumber;
  }

  set holidaysNumber(value: Array<number>) {
    this._holidaysNumber = value;
  }
}
