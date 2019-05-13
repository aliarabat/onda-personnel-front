import {Component, OnInit} from '@angular/core';
import {User} from '../../controller/model/user.model';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';
import {Session} from '../../util/session';
import {Validator} from '../../validator/validator';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public userData: User;
  public userModifiedData: User = new User(0, '', '', '', '', '', null, null, '');
  public pwdConfirmation: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.userData = Session.retrieve('loggedUser');
    });
  }


  logout() {
    this.userService.logout();
  }

  triggerUserDataChangeModal() {
    this.userModifiedData = this.userData;
    // @ts-ignore
    $('#userDataChange').modal('show');
  }

  update() {
    // @ts-ignore
    $('#username').removeClass('is-invalid');
    // @ts-ignore
    $('#emailAdd').removeClass('is-invalid');
    // @ts-ignore
    $('#pwdAdd').removeClass('is-invalid');
    // @ts-ignore
    $('#nom').removeClass('is-invalid');
    // @ts-ignore
    $('#prenom').removeClass('is-invalid');
    // @ts-ignore
    $('#nom').removeClass('is-invalid');
      if (!Validator.validateSimpleString(this.userModifiedData.username)) {
        // @ts-ignore
        $('#username').addClass('is-invalid');
      } if (!Validator.validateEmail(this.userModifiedData.email)) {
        // @ts-ignore
        $('#emailAdd').addClass('is-invalid');
      } if (!Validator.validatePassword(this.userModifiedData.password)) {
        // @ts-ignore
        $('#pwdAdd').addClass('is-invalid');
      } if (!Validator.validateSimpleString(this.userModifiedData.lastName)) {
        // @ts-ignore
        $('#nom').addClass('is-invalid');
      } if (!Validator.validateSimpleString(this.userModifiedData.firstName)) {
        // @ts-ignore
        $('#prenom').addClass('is-invalid');
      } if (!Validator.validateSimpleString(this.userModifiedData.rang)) {
        // @ts-ignore
        $('#rang').addClass('is-invalid');
      }
    }
}
