import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MiddleWare} from "../../util/middle-ware";
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-anomaly',
  templateUrl: './gestion-anomaly.component.html',
  styleUrls: ['./gestion-anomaly.component.css']
})
export class GestionAnomalyComponent implements OnInit {
  public isTechOrAdmin: boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsTechniqueOrAdmin(this.router))
      this.isTechOrAdmin = true;
  }
}
