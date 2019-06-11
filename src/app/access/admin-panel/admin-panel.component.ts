import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MiddleWare} from "../../util/middle-ware";
import {GrantedAccess} from "../../util/granted-access";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if(MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router))
      this.isAdmin=true;
  }

}
