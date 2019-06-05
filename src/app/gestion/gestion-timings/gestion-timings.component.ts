import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-timings',
  templateUrl: './gestion-timings.component.html',
  styleUrls: ['./gestion-timings.component.css']
})
export class GestionTimingsComponent implements OnInit {

  constructor(private router:Router) { }

  async ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsAdmin(this.router);
  }

}
