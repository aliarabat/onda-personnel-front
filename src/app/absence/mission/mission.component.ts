import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  constructor(private router:Router) {
    // MiddleWare.checkIfUserIsLogged(this.router);
  }

  ngOnInit() {
  }

}
