import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeVo} from '../model/employee.model';
import {ReplacementVo} from '../model/replacement.model';
import {DetailVo} from '../model/detail.model';
import Swal from "sweetalert2";
import {MissionVo} from '../model/mission.model';
import {DayDetailVo} from '../model/day-detail.model';
import {SwalUtil} from "../../util/swal-util";
import {UrlsUtil} from "../../util/urls-util";

@Injectable({
  providedIn: 'root'
})
export class ReplacementService {

  constructor(private http: HttpClient) {
  }

  private _main_url=UrlsUtil.main_personnel_url;
  private _url = this._main_url+UrlsUtil.url_dayDetail;
  private _urlEmployee = this._main_url+UrlsUtil.url_employee;
  private _urlDetail = this._main_url+UrlsUtil.url_Detail;

  private _orgEmployee: EmployeeVo = new EmployeeVo();
  private _rempEmployee: EmployeeVo = new EmployeeVo();
  private _employee1: EmployeeVo = new EmployeeVo(0, '', '', '', '', '', false);
  private _replacement: ReplacementVo = new ReplacementVo();
  private _dayDetailsRemp: Array<DayDetailVo> = new Array<DayDetailVo>();

  findEmployesByMatricule(matricule: string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        this.orgEmployee = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findReplacedEmployesByMatricule(matricule: string) {
    this.http.get<EmployeeVo>(this._urlEmployee + 'matricule/' + matricule).subscribe(
      data => {
        this.rempEmployee = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findDetailByWording(wording: string) {
    this.http.get<DetailVo>(this._urlDetail + 'wording/' + wording).subscribe(
      data => {
        this.replacement.detailVo = data;
      }, error => {
        console.log(error);
      }
    );
  }


  saveReplacement(replacement: ReplacementVo, matriculeOrg: string, matriculeRemp: string, wording: string) {
    if (replacement.reference === '' || replacement.reference === undefined) {
      SwalUtil.select('la référence de la mission');
    } else if (matriculeOrg === '' || matriculeOrg === undefined) {
      SwalUtil.select('l\'employé considéré');
    } else if (matriculeRemp === '' || matriculeRemp === undefined) {
      SwalUtil.select('l\'employé remplacant');
    } else if (replacement.replacementDate === '' || replacement.replacementDate === undefined) {
      SwalUtil.insert('la date');
    } else if (replacement.detailVo.wording === '' || replacement.detailVo.wording === undefined) {
      SwalUtil.select('l\'horaire d\'absence');
    } else if (matriculeRemp === matriculeOrg) {
      SwalUtil.select('les employés concernés');
    } else {
      SwalUtil.saveConfirmation('Modification', 'modifier').then((result) => {
        if (result.value) {
          this.http.put(this._url + 'replacement/matricule/' + matriculeOrg + '/matricule1/' + matriculeRemp + '/wordingDetail/' + wording, replacement).subscribe(
            (res) => {
              if (res === 1) {
                this.replacement = new ReplacementVo();
                this.findAlldayDetailsReplacement();
                SwalUtil.anySuccess('Remplacement effectué', 'Modification du service réussite');
              } else if (res == -5) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:l\'un des employés  n\'as pas encore de service à cette date');
              } else if (res == -4) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:l\'un des employés  n\'as pas encore de service à ce jour là');
              } else if (res == -3) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:l\'un des employés est en vacances');
              } else if (res == -2) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Le remplacant n\'est pas libre à cette horaire');
              } else if (res == -1) {
                SwalUtil.any('Erreur!', 'Modification du service échouée:l\'un des employés est déjà absent pour une raison');
              } else {
                SwalUtil.any('Erreur!', 'Modification du service échouée:Erreur Inconnue');
              }
            },
          );
        }
      });
    }
  }

  deleteAllDayDetailsWhereIsNull() {
    this.http.delete(this.url + 'null').subscribe();
  }

  findAlldayDetailsReplacement() {
    this.http.get<Array<DayDetailVo>>(this._url + "replacement/").subscribe(
      data => {
        data ? this.dayDetailsRemp = data : this.dayDetailsRemp = [];
      }, error => {
        console.log(error);
      }
    );
  }


  deleteReplacement(dayDetail: DayDetailVo) {
    SwalUtil.saveConfirmation('Suppression','supprimer').then((result) => {
      if (result.value) {
        this.http.put(this._url + 'replacement/id/' + dayDetail.id, dayDetail).subscribe(
          (res) => {
            if (res == 1) {
              this.findAlldayDetailsReplacement();
              SwalUtil.anySuccess('Suppression du remplacement', 'Suppression du service réussite')
            } else {
              SwalUtil.any('Erreur!', 'Suppression du service échouée:Erreur Inconnue');
            }
          },
        );
      }
    });
  }

  formInit() {
    this.replacement = new ReplacementVo();
    this.orgEmployee = new EmployeeVo();
    this.rempEmployee = new EmployeeVo();
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
