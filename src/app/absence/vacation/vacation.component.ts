import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from '../../util/granted-access';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  public isRespoOrAdmin: boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.isRespoOrAdmin = true;
    }
  }

}
