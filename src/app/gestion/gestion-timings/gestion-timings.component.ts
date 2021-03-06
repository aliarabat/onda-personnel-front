import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from '../../util/granted-access';

@Component({
  selector: 'app-gestion-timings',
  templateUrl: './gestion-timings.component.html',
  styleUrls: ['./gestion-timings.component.css']
})
export class GestionTimingsComponent implements OnInit {
  public  isAdmin: boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router)) {
      this.isAdmin = true;
    }
  }

}
