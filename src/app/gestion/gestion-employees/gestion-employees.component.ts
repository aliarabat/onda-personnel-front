import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';

@Component({
  selector: 'app-gestion-employees',
  templateUrl: './gestion-employees.component.html',
  styleUrls: ['./gestion-employees.component.css']
})
export class GestionEmployeesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

}
