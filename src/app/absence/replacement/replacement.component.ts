import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MiddleWare} from '../../util/middle-ware';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
  }

}
