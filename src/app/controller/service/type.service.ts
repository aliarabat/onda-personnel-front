import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeVo} from '../model/type';
import {SwalUtil} from "../../util/swal-util";
import {UrlsUtil} from "../../util/urls-util";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private _url = UrlsUtil.main_dashboard_url + UrlsUtil.url_type;

  constructor(private http: HttpClient) {
  }

  private _typeCreate: TypeVo = new TypeVo();
  private _typeEdit: TypeVo = new TypeVo();

  private _allTypes: Array<TypeVo> = new Array<TypeVo>();

  createType(type: TypeVo) {
    if (type.reference === '' || type.reference === undefined) {
      SwalUtil.insert('la référence du type');
    } else if (type.name === '' || type.name === undefined) {
      SwalUtil.insert('le nom du type');
    } else {
      SwalUtil.saveConfirmation('Sauvegarde', 'sauvegarder').then((result) => {
        if (result.value) {
          this.http.post(this._url, type).subscribe(
            (res) => {
              if (res == 1) {
                this.typeCreate = new TypeVo();
                this.findAllTypes();
                SwalUtil.anySuccess('Ajout du type', 'Ajout réussite');
              } else {
                SwalUtil.alreadyExist('Ce type');
              }
            }
          );
        }
      });
    }
  }

  findAllTypes() {
    this.http.get<Array<TypeVo>>(this._url).subscribe(
      data => {
        data ? this.allTypes = data : this.allTypes = new Array<TypeVo>();
      }, error => {
        console.log(error);
      }
    );
  }

  findTypeById(id: number) {
    this.http.get<TypeVo>(this._url + 'id/' + id).subscribe(
      data => {
        data ? this.typeEdit = data : this.typeEdit = new TypeVo();
      }, error => {
        console.log(error);
      }
    );
  }

  editType(newType: TypeVo) {
    if (newType.reference === '' || newType.reference === undefined) {
      SwalUtil.insert('la référence du type!');
    } else if (newType.name === '' || newType.name === undefined) {
      SwalUtil.insert('le nom du type!');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this.http.put(this._url, newType).subscribe(
            (res) => {
              if (res == 1) {
                this.findAllTypes();
                SwalUtil.anySuccess('Modification du type', 'Modification du Type réussite');
                // @ts-ignore
                $('#equipmentTypeModal').modal('hide');
              } else {
                SwalUtil.any('Erreur!', "Modification du Type échouée:Erreur Inconnue!");
              }
            },
          );
        }
      });
    }
  }

  deleteTypeById(id: number) {
    SwalUtil.saveConfirmation('Suppression', 'supprimer').then((result) => {
      if (result.value) {
        this.http.delete(this._url + 'id/' + id).subscribe(
          (res) => {
            if (res == 1) {
              this.findAllTypes();
              SwalUtil.anySuccess('Suppression du type', ' Type Supprimé');
            } else {
              SwalUtil.any('Erreur!', "Suppression échouée:Erreur inconnue ");
            }
          }
        );
      }
    });
  }

  initForm() {
    this._typeCreate = new TypeVo();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get typeCreate(): TypeVo {
    return this._typeCreate;
  }

  set typeCreate(value: TypeVo) {
    this._typeCreate = value;
  }

  get allTypes(): Array<TypeVo> {
    return this._allTypes;
  }

  set allTypes(value: Array<TypeVo>) {
    this._allTypes = value;
  }

  get typeEdit(): TypeVo {
    return this._typeEdit;
  }

  set typeEdit(value: TypeVo) {
    this._typeEdit = value;
  }
}
