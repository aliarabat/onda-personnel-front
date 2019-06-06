import {Component, OnInit} from '@angular/core';
import {EquipementService} from '../../../controller/service/equipement.service';
import {TypeService} from '../../../controller/service/type.service';
import {Router} from "@angular/router";
import {MiddleWare} from "../../../util/middle-ware";

@Component({
  selector: 'app-gestion-equipment-list',
  templateUrl: './gestion-equipment-list.component.html',
  styleUrls: ['./gestion-equipment-list.component.css']
})
export class GestionEquipmentListComponent implements OnInit {

  constructor(private equipementService: EquipementService, private typeService: TypeService, private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router)) {
      this.equipementService.findAllEquipements();
      this.typeService.findAllTypes();
    }
  }

  public get allEquipements() {
    return this.equipementService.allEquipements;
  }

  public get equipementEdit() {
    return this.equipementService.editEquipement;
  }

  public get allTypes() {
    return this.typeService.allTypes;
  }

  findById(id: number) {
    this.equipementService.findById(id);
  }

  deleteById(id: number) {
    this.equipementService.deleteEquipById(id);
  }

  edit() {
    this.equipementService.editEquip();
  }
}
