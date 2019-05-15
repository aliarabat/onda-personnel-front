import {Component, OnInit} from '@angular/core';
import {User} from '../../controller/model/user.model';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';
import {Session} from '../../util/session';
import {UserUtil} from '../../util/userUtil';
import {Validator} from '../../validator/validator';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public userData: User;
  public emailChangeRequestLocal = {userId: 0, originalEmail: '', newEmail: ''};
  public pwdChangeRequestLocal = {userId: 0, oldPassword: '', newPassword: ''};
  public userDataChangeRequestLocal = {userId: 0, username: '', firstName: '', lastName: '',};
  public pwdChangeConfirmation: '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if(Session.retrieve('loggedUser')){
        this.userData = Session.retrieve('loggedUser');
        this.emailChangeRequestLocal.userId = this.userData.id;
        this.pwdChangeRequestLocal.userId = this.userData.id;
        this.userDataChangeRequestLocal.userId = this.userData.id;
        this.userDataChangeRequestLocal.username = this.userData.username;
        this.userDataChangeRequestLocal.firstName = this.userData.firstName;
        this.userDataChangeRequestLocal.lastName = this.userData.lastName;
      }
    });
  }

  public get emailChangeRequest() {
    return this.userService.emailChangeRequest;
  }

  public set emailChangeRequest(data) {
    this.userService.emailChangeRequest = data;
  }

  public get pwdChangeRequest() {
    return this.userService.pwdChangeRequest;
  }

  public set pwdChangeRequest(data) {
    this.userService.pwdChangeRequest = data;
  }

  public get userDataChangeRequest() {
    return this.userService.userDataChangeRequest;
  }

  public set userDataChangeRequest(data) {
    this.userService.userDataChangeRequest = data;
  }

  public get userModifiedData() {
    return this.userService.userModifiedData;
  }

  public set userModifiedData(data) {
    this.userService.userModifiedData = data;
  }


  logout() {
    this.userService.logout();
  }

  triggerUserDataChangeModal() {
    this.userModifiedData = this.userData;
    // @ts-ignore
    $('#userDataChange').modal('show');
  }


  updateEmail() {
    if (!UserUtil.userEmailChangeChecker(this.emailChangeRequestLocal.originalEmail, this.emailChangeRequestLocal.newEmail)) {
      $('#emailOld').addClass('is-invalid');
    }
    if (!Validator.validateEmail(this.emailChangeRequestLocal.newEmail)) {
      $('#emailNew').addClass('is-invalid');
    } else {
      this.emailChangeRequest = this.emailChangeRequestLocal;
      this.userService.emailUpdate();
    }
  }

  updatePassword() {
    $('#pwdNew').removeClass('is-invalid');
    $('#pwdOld').removeClass('is-invalid');
    $('#pwdConfirmation').removeClass('is-invalid');

    if (!UserUtil.userPasswordChangeChecker(this.pwdChangeRequestLocal.newPassword, this.pwdChangeConfirmation)) {
      $('#pwdNew').addClass('is-invalid');
      $('#pwdConfirmation').addClass('is-invalid');
    } else if (!Validator.validatePassword(this.pwdChangeRequestLocal.oldPassword)) {
      $('#pwdOld').addClass('is-invalid');
    } else {
      this.pwdChangeRequest = this.pwdChangeRequestLocal;
      this.userService.passwordUpdate();
    }
  }

  update() {
    $('#username').removeClass('is-invalid');
    $('#pnom').removeClass('is-invalid');
    $('#nomm').removeClass('is-invalid');

    let isValidated = true;
    if (!Validator.validateSimpleString(this.userDataChangeRequestLocal.username)) {
      $('#username').addClass('is-invalid');
      isValidated = false;
    }
    if (!Validator.validateSimpleString(this.userDataChangeRequestLocal.firstName)) {
      $('#pnom').addClass('is-invalid');
      isValidated = false;
    }
    if (!Validator.validateSimpleString(this.userDataChangeRequestLocal.lastName)) {
      $('#nomm').addClass('is-invalid');
      isValidated = false;
    }
    if (isValidated) {
      this.userDataChangeRequest = this.userDataChangeRequestLocal;
      this.userService.update();
    }

  }


}
