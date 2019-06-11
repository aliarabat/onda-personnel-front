import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-gestion-employees',
  templateUrl: './gestion-employees.component.html',
  styleUrls: ['./gestion-employees.component.css']
})
export class GestionEmployeesComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router))
      this.isAdmin = true;
  }

}
