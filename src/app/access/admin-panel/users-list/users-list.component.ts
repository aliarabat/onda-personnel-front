import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {User} from '../../../controller/model/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService) {

  }

  public get users() {
    return this.userService.users;
  }

  public set users(data) {
    this.userService.users = data;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll();
  }

  block(user:User){
    this.userService.block(user)
  }

  unblock(user:User){
    this.userService.unblock(user)

  }

}
