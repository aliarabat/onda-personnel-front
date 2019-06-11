import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MiddleWare} from "../../util/middle-ware";
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-equipment',
  templateUrl: './gestion-equipment.component.html',
  styleUrls: ['./gestion-equipment.component.css']
})
export class GestionEquipmentComponent implements OnInit {

  private isTechOrAdmin: boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsTechniqueOrAdmin(this.router))
      this.isTechOrAdmin = true;
  }

}
