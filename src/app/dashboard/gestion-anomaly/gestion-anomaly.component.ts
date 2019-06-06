import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MiddleWare} from "../../util/middle-ware";
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-anomaly',
  templateUrl: './gestion-anomaly.component.html',
  styleUrls: ['./gestion-anomaly.component.css']
})
export class GestionAnomalyComponent implements OnInit {

  constructor(private router:Router) { }

  async ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsTechniqueOrAdmin(this.router);
  }

}
