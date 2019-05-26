import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HolidayVo} from '../model/holiday.model';
//import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {isFatalDiagnosticError} from '@angular/compiler-cli/src/ngtsc/diagnostics';
import {SwalUtil} from "../../util/swal-util";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  constructor(private http: HttpClient) {
  }

  private _url = 'http://localhost:8099/personnel-api/personnels/holiday/';
  private _holidayCreate: HolidayVo = new HolidayVo(0, '', '', '');
  private _holidaysVo: Array<HolidayVo> = new Array<HolidayVo>();
  private _holidaysList: Array<HolidayVo> = new Array<HolidayVo>();
  private _holidayVoToUpdate: HolidayVo = new HolidayVo(0, '', '', '');

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

  addHoliday() {
    if (this._holidayCreate.reference === '') {
      SwalUtil.insert("le référence");
    } else if (this._holidayCreate.startingDate === '') {
      SwalUtil.insert("la date début");
    } else if (this._holidayCreate.endingDate === '') {
      SwalUtil.insert("la date fin");
    } else {
      if (this._holidaysVo.findIndex(hVo => hVo.reference === this._holidayCreate.reference) !== -1 || this._holidaysList.findIndex(hVo => hVo.reference === this._holidayCreate.reference) !== -1) {
        SwalUtil.alreadyExist("Ce référence");
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
    if (index != -1) {
      this._holidaysVo.splice(index, 1);
    }
  }

  confirm() {
    if (this._holidaysVo.length === 0) {
      SwalUtil.fillTheTable();
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-secondary mr-1'
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: 'Etes-vous sure?',
        text: 'Vous ne pourrez pas revenir en arrière!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, sauvegarder!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Sauvegarder!',
            'Sauvegardés avec succés.',
            'success'
          );
          this.http.post(this._url, this._holidaysVo).subscribe(
            data => {
              if (data === 1) {
                this.findAll();
                this._holidaysVo = new Array<HolidayVo>();
              }
            }, error => {
              console.log(error);
            }
          );
        }
      });

    }
  }

  findAll() {
    this.http.get<Array<HolidayVo>>(this._url).subscribe(data => data ? this._holidaysList = data : this._holidaysList = []);
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

  updateHoliday(hol: HolidayVo) {
    this.checkHolidayVoAttrs(hol);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-secondary mr-1'
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: 'Etes-vous sure?',
        text: 'Vous ne pourrez pas revenir en arrière!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, sauvegarder!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          this.http.put<HolidayVo>(this._url, this._holidayVoToUpdate).subscribe(
            data => {
              if (data == 1) {
                // @ts-ignore
                $( "#updateHolidayModal").modal("hide");
                this.findAll();
                this._holidayVoToUpdate = new HolidayVo(0, '', '', '');
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                });
                Toast.fire({
                  type: 'success',
                  title: 'Sauvegardé avec succés'
                });
              }
            }, error => {
              console.log(error);
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-1',
        cancelButton: 'btn btn-danger mr-1'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Etes-vous sure?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.http.delete(this._url + 'id/' + id).subscribe();
        this._holidaysList = this._holidaysList.filter(h => h.id !== id);
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'Vos infos ont été supprimés.',
          'success'
        );
      }
    });
  }

  reinitializeList() {
    this._holidaysVo = new Array<HolidayVo>();
  }
}
