import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {User} from '../../../controller/model/user.model';
import {Router} from '@angular/router';
import {MiddleWare} from '../../../util/middle-ware';
import {GrantedAccess} from '../../../util/granted-access';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (MiddleWare.checkIfUserIsLogged(this.router) && GrantedAccess.checkIfUserIsAdmin(this.router)) {
      this.getAllUsers();
    }
  }

  public get users() {
    return this.userService.users;
  }

  public set users(data) {
    this.userService.users = data;
  }

  getAllUsers() {
    this.userService.getAll();
  }

  block(user: User) {
    this.userService.block(user);
  }

  unblock(user: User) {
    this.userService.unblock(user);
  }
}
