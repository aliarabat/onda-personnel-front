import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-holidays',
  templateUrl: './gestion-holidays.component.html',
  styleUrls: ['./gestion-holidays.component.css']
})
export class GestionHolidaysComponent implements OnInit {

  constructor(private router:Router) { }

  async ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsAdmin(this.router);
  }

}
