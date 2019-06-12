import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../util/middle-ware';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

}
