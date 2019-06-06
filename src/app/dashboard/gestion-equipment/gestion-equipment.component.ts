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

  constructor(private router: Router) {
  }

  async ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsAdmin(this.router);
  }


}
