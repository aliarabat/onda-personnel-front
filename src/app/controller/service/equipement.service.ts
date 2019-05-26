import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EquipementVo} from '../model/equipement';
import Swal from 'sweetalert2';
import {TypeVo} from '../model/type';
import {SwalUtil} from "../../util/swal-util";


@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private _url = 'http://localhost:8097/dashboard-api/dashboards/equipement/';

  private _equipementCreate: EquipementVo = new EquipementVo();
  private _equipementTobeAdded: Array<EquipementVo> = [];
  private _allEquipements: Array<EquipementVo> = [];
  private _editEquipement: EquipementVo = new EquipementVo();

  constructor(private http: HttpClient) {
  }

  addEquipement() {
    if (this._equipementCreate.name === '' || this._equipementCreate.name === undefined) {
      SwalUtil.insert("le nom!");
    } else if (this._equipementCreate.typeVo.name == '' || this._equipementCreate.typeVo.name == undefined) {
      SwalUtil.insert("le type!");
    } else if (this._equipementCreate.expectedBreakPeriodMaintenance.hour == '' || this._equipementCreate.expectedBreakPeriodMaintenance.hour == undefined) {
      SwalUtil.insert("l'heure de la maintenance prévue!");
    } else if (this._equipementCreate.expectedBreakPeriodMaintenance.minute == undefined || this._equipementCreate.expectedBreakPeriodMaintenance.minute == '') {
      SwalUtil.insert("la minute de la maintenance prévue!");
    } else {
      Swal.fire({
        title: 'Ajout',
        text: 'Vous êtes sûr de l\'ajout',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6d20b',
        cancelButtonText: 'Annuler',

        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer'
      }).then((result) => {
        if (result.value) {
          let equipementClone = new EquipementVo(0, this._equipementCreate.name, this._equipementCreate.expectedBreakPeriodMaintenance, this._equipementCreate.typeVo);
          this._equipementTobeAdded.push(equipementClone);
          this._equipementCreate = new EquipementVo();
          console.log(equipementClone);
        }
      });
    }
  }

  createEquipement() {
    if (this._equipementTobeAdded.length === 0) {
      SwalUtil.fillTheTable();
    } else {
      Swal.fire({
        title: 'Ajout',
        text: 'Vous êtes sûr de l\'ajout',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6d20b',
        cancelButtonText: 'Annuler',

        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer'
      }).then((result) => {
        if (result.value) {
          this.http.post(this._url, this._equipementTobeAdded).subscribe(
            (res) => {
              if (res == 1) {
                this._equipementTobeAdded = new Array<EquipementVo>();
                this.findAllEquipements();
                Swal.fire({
                  title: 'Ajout équipement(s)',
                  text: ' Ajout réussit',
                  type: 'success',
                });

              } else if (res == -2) {
                SwalUtil.any("Erreur!", "Ajout échoué: l'un des équipements existe déjà");
              } else {
                SwalUtil.any("Erreur!", "Ajout échoué: l'un des équipements existe déjà");
              }
            }
          );
        }
      });
    }
  }


  findAllEquipements() {
    this.http.get<Array<EquipementVo>>(this._url).subscribe(
      data => {
        if (data != null) {
          this.allEquipements = data;
        } else {
          this.allEquipements = new Array<EquipementVo>();

        }
      }, error => {
        console.log(error);
      }
    );
  }

  deleteFromList(equipement: EquipementVo) {
    const index: number = this._equipementTobeAdded.indexOf(equipement);
    if (index !== -1) {
      this._equipementTobeAdded.splice(index, 1);
    }
  }

  deleteEquipById(id: number) {
    Swal.fire({
      title: 'Suppression',
      text: 'Vous êtes sûr de la Suppression',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d6d20b',
      cancelButtonText: 'Annuler',

      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.value) {
        this.http.delete(this._url + 'id/' + id).subscribe(
          (res) => {
            if (res == 1) {
              this.findAllEquipements();
              SwalUtil.deleted("l'équipement", "Type Supprimé");
            } else {
              SwalUtil.any("Erreur!", "Suppression échouée:Erreur inconnue");
            }
          }
        );
      }
    });
  }

  editEquip() {
    if (this._editEquipement.name === '' || this._editEquipement.name === undefined) {
      SwalUtil.insert("l'équipement");
    } else if (this._editEquipement.typeVo.name === '' || this._editEquipement.typeVo.name === undefined) {
      SwalUtil.insert("le type");
    } else if (this._editEquipement.expectedBreakPeriodMaintenance.hour === '' || this._editEquipement.expectedBreakPeriodMaintenance.hour === undefined) {
      SwalUtil.insert("l'heure de la maintenance prévue!");
    } else if (this._editEquipement.expectedBreakPeriodMaintenance.minute === '' || this._editEquipement.expectedBreakPeriodMaintenance.minute === undefined) {
      SwalUtil.insert("la minute de la maintenance prévue!");
    } else {
      Swal.fire({
        title: 'Modification',
        text: 'Vous êtes sûr de la modification',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6d20b',
        cancelButtonText: 'Annuler',

        cancelButtonColor: '#d33',
        confirmButtonText: 'Modifier'
      }).then((result) => {
        if (result.value) {


          this.http.put(this._url, this._editEquipement).subscribe(
            (res) => {
              if (res == 1) {
                this.findAllEquipements();
                SwalUtil.updateOf("l'équipement");
                // @ts-ignore
                $('#equipmentModal').modal('hide');
              } else if (res == -3) {
                SwalUtil.alreadyExist("Ce nom");
              } else if (res == -1) {
                SwalUtil.any("Erreur!", "Ajout échoué:équipement indisponible!");
              } else {
                Swal.fire({
                  title: 'Erreur!',
                  text: '  ',
                  type: 'error',
                });
                SwalUtil.any("Erreur!", "Modification de l'équipement échouée:Erreur Inconnue!");
              }
            },
          );
        }
      });
    }
  }


  findById(id: number) {
    this.http.get<EquipementVo>(this._url + 'id/' + id).subscribe(
      data => {
        if (data) {
          this.editEquipement = data;
        } else {
          this.editEquipement = new EquipementVo();
        }
      }, error => {
        console.log(error);
      }
    );
  }

  initForm() {
    this._equipementCreate = new EquipementVo();
  }

  initList() {
    this._equipementTobeAdded = new Array<EquipementVo>();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get equipementCreate(): EquipementVo {
    return this._equipementCreate;
  }

  set equipementCreate(value: EquipementVo) {
    this._equipementCreate = value;
  }

  get equipementTobeAdded(): Array<EquipementVo> {
    return this._equipementTobeAdded;
  }

  set equipementTobeAdded(value: Array<EquipementVo>) {
    this._equipementTobeAdded = value;
  }

  get allEquipements(): Array<EquipementVo> {
    return this._allEquipements;
  }

  set allEquipements(value: Array<EquipementVo>) {
    this._allEquipements = value;
  }

  get editEquipement(): EquipementVo {
    return this._editEquipement;
  }

  set editEquipement(value: EquipementVo) {
    this._editEquipement = value;
  }
}
