import { Component, OnInit } from '@angular/core';
import {EquipementService} from '../../../controller/service/equipement.service';
import {TypeService} from '../../../controller/service/type.service';
import {EquipementVo} from '../../../controller/model/equipement';

@Component({
  selector: 'app-gestion-equipment-create',
  templateUrl: './gestion-equipment-create.component.html',
  styleUrls: ['./gestion-equipment-create.component.css']
})
export class GestionEquipmentCreateComponent implements OnInit {

  constructor(private equipementService:EquipementService,private typeService:TypeService) { }

  ngOnInit() {
    this.typeService.findAllTypes();
  }
  public get allTypes(){
    return this.typeService.allTypes;
  }
  public get equipementCreate(){
    return this.equipementService.equipementCreate;
  }

  saveEquipement(){
    this.equipementService.createEquipement();
  }
  addEquipement(){
    this.equipementService.addEquipement();
  }
removeEquipement(equipement:EquipementVo){
    this.equipementService.deleteFromList(equipement);
}

public get equipementsToBeAdded(){
    return this.equipementService.equipementTobeAdded;
}
}
