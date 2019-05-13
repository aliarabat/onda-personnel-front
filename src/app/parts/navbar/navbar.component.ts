import {Component, OnInit} from '@angular/core';
import {User} from '../../controller/model/user.model';
import {Session} from '../../util/session';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userData: User;

  constructor(private userService: UserService, private router:Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
        this.userData = Session.retrieve('loggedUser');
      });
  }


  logout() {
    this.userService.logout();
  }
}
