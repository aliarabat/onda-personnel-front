import {Component, OnInit} from '@angular/core';
import {MiddleWare} from "../../../util/middle-ware";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-services-print',
  templateUrl: './gestion-services-print.component.html',
  styleUrls: ['./gestion-services-print.component.css']
})
export class GestionServicesPrintComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router)
  }


}
