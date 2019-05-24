import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeVo} from '../model/type';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private _url = "http://localhost:8097/dashboard-api/dashboards/type/";

  constructor(private http:HttpClient) { }
private _typeCreate:TypeVo=new TypeVo();
  private _typeEdit:TypeVo=new TypeVo();

  private _allTypes:Array<TypeVo> = new Array<TypeVo>();

  createType(type:TypeVo) {
    if (type.reference === '' || type.reference === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir la référence du type  ",
        type: 'warning',
      });
    } else if (type.name === '' || type.name === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir le nom du type ",
        type: 'warning',
      });
    } else{
      Swal.fire({
        title: 'Ajout',
        text: "Vous êtes sûr de l'ajout",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6d20b',
        cancelButtonText:'Annuler',

        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer'
      }).then((result) => {
        if (result.value) {
      this.http.post(this._url, type).subscribe(
        (res) => {
          if (res == 1) {
            this.typeCreate = new TypeVo();
            this.findAllTypes();
            Swal.fire({
              title: 'Ajout du type',
              text: ' Ajout réussit',
              type: 'success',
            });

          } else {
            Swal.fire({
              title: 'Erreur!',
              text: "Ajout échoué:Ce type existe déjà ",
              type: 'error',
            });
          }
        }
      );
    }

  });
  }
  }


  findAllTypes(){
    this.http.get<Array<TypeVo>>(this._url).subscribe(
      data => {
        if(data!=null){
          this.allTypes = data;
        }
        else{
          this.allTypes = new Array<TypeVo>();

        }
      }, error => {
        console.log(error);
      }
    );
  }

  findTypeById(id:number){
    this.http.get<TypeVo>(this._url+'id/'+id).subscribe(
      data => {
        if(data!=null){
          this.typeEdit = data;
        }
        else {
          this.typeEdit=new TypeVo();
        }
      }, error => {
        console.log(error);
      }
    );

  }

  editType(newType:TypeVo){
    if (newType.reference === '' || newType.reference === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir la référence du type  ",
        type: 'warning',
      });
    } else if (newType.name === '' || newType.name === undefined) {
      Swal.fire({
        title: 'Erreur!',
        text: "Veuillez saisir le nom du type  ",
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




          this.http.put(this._url,newType).subscribe(
            (res) => {
              if (res == 1) {
                this.findAllTypes();

                Swal.fire({
                  title: 'Modification du type',
                  text: 'Modification du Type réussite',
                  type: 'success',
                });
                // @ts-ignore
                $('#equipmentTypeModal').modal('hide')


              } else {
                Swal.fire({
                  title: 'Erreur!',
                  text: "Modification du Type échouée:Erreur Inconnue  ",
                  type: 'error',
                });
              }

            },
          );


        }

      });
    }
  }


  deleteTypeById(id:number){
    Swal.fire({
      title: 'Suppression',
      text: "Vous êtes sûr de la Suppression",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d6d20b',
      cancelButtonText:'Annuler',

      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.value) {
    this.http.delete(this._url+'id/'+id).subscribe(
      (res) => {
        if (res == 1) {
          this.findAllTypes();
          Swal.fire({
            title: 'Suppression du type',
            text: ' Type Supprimé',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Erreur!',
            text: "Suppression échouée:Erreur inconnue ",
            type: 'error',
          });
        }
      }
    );
      }
    });
  }

  initForm(){
    this._typeCreate=new TypeVo();
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
