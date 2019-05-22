import { Component, OnInit } from '@angular/core';
import {TypeService} from '../../../controller/service/type.service';

@Component({
  selector: 'app-gestion-equipment-type',
  templateUrl: './gestion-equipment-type.component.html',
  styleUrls: ['./gestion-equipment-type.component.css']
})
export class GestionEquipmentTypeComponent implements OnInit {

  constructor(private typeService:TypeService) { }

  ngOnInit() {
    this.typeService.findAllTypes();
  }
  public get allTypes(){
    return this.typeService.allTypes;
  }
  public get typeCreate(){
    return this.typeService.typeCreate;
  }
  public get typeEdit(){
    return this.typeService.typeEdit;
  }
  createType(){
    this.typeService.createType(this.typeService.typeCreate);
  }
  editType(){
    this.typeService.editType(this.typeService.typeEdit);
  }
  deleteType(id:number){
    this.typeService.deleteTypeById(id);
  }

  findById(id:number){
    this.typeService.findTypeById(id);
  }

}
