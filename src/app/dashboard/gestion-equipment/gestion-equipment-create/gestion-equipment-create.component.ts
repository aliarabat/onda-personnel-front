import {Component, OnInit} from '@angular/core';
import {EquipementService} from '../../../controller/service/equipement.service';
import {TypeService} from '../../../controller/service/type.service';
import {EquipementVo} from '../../../controller/model/equipement';
import {MiddleWare} from '../../../util/middle-ware';
import {Router} from '@angular/router';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-equipment-create',
  templateUrl: './gestion-equipment-create.component.html',
  styleUrls: ['./gestion-equipment-create.component.css']
})
export class GestionEquipmentCreateComponent implements OnInit {

  constructor(private equipementService: EquipementService, private typeService: TypeService, private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router)) {
      this.typeService.findAllTypes();
    }
  }

  public get allTypes() {
    return this.typeService.allTypes;
  }

  public get equipementCreate() {
    return this.equipementService.equipementCreate;
  }

  saveEquipement() {
    this.equipementService.createEquipement();
  }

  addEquipement() {
    this.equipementService.addEquipement();
  }

  removeEquipement(equipement: EquipementVo) {
    this.equipementService.deleteFromList(equipement);
  }

  public get equipementsToBeAdded() {
    return this.equipementService.equipementTobeAdded;
  }

  initForm() {
    this.equipementService.initForm();
  }

  initList() {
    this.equipementService.initList();
  }

}
