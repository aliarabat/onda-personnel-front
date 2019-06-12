import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';
import {GrantedAccess} from '../../util/granted-access';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {

  private isRespoOrAdmin = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsResponsableOrAdmin(this.router)) {
      this.isRespoOrAdmin = true;
    }
  }

}
