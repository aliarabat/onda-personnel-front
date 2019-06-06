import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.css']
})
export class GestionServicesComponent implements OnInit {

  constructor(private router:Router) { }

  async ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router);
  }

}
