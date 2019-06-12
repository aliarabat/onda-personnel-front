import {Component, OnInit} from '@angular/core';
import {MiddleWare} from '../../../util/middle-ware';
import {Router} from '@angular/router';
import { GrantedAccess } from 'src/app/util/granted-access';

@Component({
  selector: 'app-gestion-services-print',
  templateUrl: './gestion-services-print.component.html',
  styleUrls: ['./gestion-services-print.component.css']
})
export class GestionServicesPrintComponent implements OnInit {

  constructor(private router:  Router) {
  }

  async ngOnInit() {
    await MiddleWare.checkIfUserIsLogged(this.router);
    await GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router);
  }


}
