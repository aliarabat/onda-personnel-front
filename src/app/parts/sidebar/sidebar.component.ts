import {Component, OnInit} from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {Router} from '@angular/router';
import {UserUtil} from '../../util/userUtil';
import {Validator} from '../../validator/validator';
import {SwalUtil} from '../../util/swal-util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public emailChangeRequestLocal = {userId: 0, originalEmail: '', newEmail: ''};
  public pwdChangeRequestLocal = {userId: 0, oldPassword: '', newPassword: ''};
  public userDataChangeRequestLocal = {userId: 0, username: '', firstName: '', lastName: '',};
  public pwdChangeConfirmation: '';
  public pwdUserCreateConfirmation: '';
  public isUserCreationValidated = true;
  public currentDate = new Date();
  public minDate = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDay());

  constructor(private userService: UserService, private router: Router) {
  }

  gestionState: boolean = false;
  absencesState: boolean = false;
  indicateursState: boolean = false;
  //for pesonnel project
  employeeState: boolean = false;
  holidaysState: boolean = false;
  detailsState: boolean = false;
  // for dashboard project
  equipementsState: boolean = false;

  async ngOnInit() {
    await this.router.events.subscribe(() => {
      let loggedUser = UserUtil.getLoggedUser();
      if (loggedUser) {
        this.userData = loggedUser;
        this.emailChangeRequestLocal.userId = loggedUser.id;
        this.pwdChangeRequestLocal.userId = loggedUser.id;
        this.userDataChangeRequestLocal.userId = loggedUser.id;
        this.userDataChangeRequestLocal.username = loggedUser.username;
        this.userDataChangeRequestLocal.firstName = loggedUser.firstName;
        this.userDataChangeRequestLocal.lastName = loggedUser.lastName;
        this.controlAccessByRang();
      }

    });

  }

  controlAccessByRang() {
    if (UserUtil.getLoggedUser().rang === 'Technicien') {
      this.gestionState = true;
      this.absencesState = true;
      this.equipementsState = true;
    } else if (UserUtil.getLoggedUser().rang === 'Responsable') {
      this.indicateursState = true;
      this.holidaysState = true;
      this.employeeState = true;
      this.detailsState = true;
    }
  }

  public get userData() {
    return this.userService.userData;
  }

  public set userData(data) {
    this.userService.userData = data;
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

  public get user() {
    return this.userService.user;
  }

  public set user(data) {
    this.user = data;
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
    $('#emailOld').removeClass('is-invalid');
    $('#emailNew').removeClass('is-invalid');
    let isValidated = true;

    if (!Validator.validateEmail(this.emailChangeRequestLocal.newEmail)) {
      $('#emailNew').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#emailNew').addClass('is-valid');
      isValidated = true;
    }

    if (!UserUtil.userEmailChangeChecker(this.emailChangeRequestLocal.originalEmail, this.emailChangeRequestLocal.newEmail)) {
      $('#emailOld').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#emailOld').addClass('is-valid');
      isValidated = true;
    }

    if (isValidated) {
      SwalUtil.changeWarning().then((result) => {
        if (result.value) {
          this.emailChangeRequest = this.emailChangeRequestLocal;
          this.userService.emailUpdate();
        } else {
          SwalUtil.actionCanceled();
        }
      });

    }
  }

  updatePassword() {
    let isValidated = true;
    $('#pwdNew').removeClass('is-invalid');
    $('#pwdOld').removeClass('is-invalid');
    $('#pwdConfirmation').removeClass('is-invalid');

    if (!UserUtil.userPasswordChangeChecker(this.pwdChangeRequestLocal.newPassword, this.pwdChangeConfirmation)) {
      $('#pwdNew').addClass('is-invalid');
      $('#pwdConfirmation').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#pwdNew').addClass('is-valid');
      $('#pwdConfirmation').addClass('is-valid');
      isValidated = true;
    }
    if (!Validator.validatePassword(this.pwdChangeRequestLocal.oldPassword)) {
      $('#pwdOld').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#pwdOld').addClass('is-valid');
      isValidated = true;
    }
    if (isValidated) {
      SwalUtil.changeWarning().then((result) => {
        if (result.value) {
          this.pwdChangeRequest = this.pwdChangeRequestLocal;
          this.userService.passwordUpdate();
        } else {
          SwalUtil.actionCanceled();
        }
      });

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
    } else {
      $('#username').addClass('is-valid');
      isValidated = true;
    }
    if (!Validator.validateSimpleString(this.userDataChangeRequestLocal.firstName)) {
      $('#pnom').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#pnom').addClass('is-valid');
      isValidated = true;
    }
    if (!Validator.validateSimpleString(this.userDataChangeRequestLocal.lastName)) {
      $('#nomm').addClass('is-invalid');
      isValidated = false;
    } else {
      $('#nomm').addClass('is-valid');
      isValidated = true;
    }
    if (isValidated) {
      SwalUtil.changeWarning().then((result) => {
        if (result.value) {
          this.userDataChangeRequest = this.userDataChangeRequestLocal;
          this.userService.update();
        } else {
          SwalUtil.actionCanceled();
        }
      });
    }
  }

  validateUserCreation() {
    $('#userCreateUsername').removeClass('is-invalid');
    $('#userCreateEmail').removeClass('is-invalid');
    $('#userCreateFirstName').removeClass('is-invalid');
    $('#userCreateLastName').removeClass('is-invalid');
    $('#userCreatePwd').removeClass('is-invalid');
    $('#userCreatePwdConfirmation').removeClass('is-invalid');
    $('#userCreateBDate').removeClass('is-invalid');
    $('#userCreateRang').removeClass('is-invalid');


    if (!Validator.validateSimpleString(this.user.username)) {
      $('#userCreateUsername').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreateUsername').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (!Validator.validateSimpleString(this.user.firstName)) {
      $('#userCreateFirstName').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreateFirstName').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (!Validator.validateSimpleString(this.user.lastName)) {
      $('#userCreateLastName').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreateLastName').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (!Validator.validateEmail(this.user.email)) {
      $('#userCreateEmail').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreateEmail').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (!Validator.validatePassword(this.user.password)) {
      $('#userCreatePwd').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreatePwd').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (!Validator.validatePasswordConfirmation(this.user.password, this.pwdUserCreateConfirmation)) {
      $('#userCreatePwdConfirmation').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreatePwdConfirmation').addClass('is-valid');
      this.isUserCreationValidated = true;
    }

    if (this.user.rang !== 'Administrateur' && this.user.rang !== 'Responsable') {
      $('#userCreateRang').addClass('is-invalid');
      this.isUserCreationValidated = false;
    } else {
      $('#userCreateRang').addClass('is-valid');
      this.isUserCreationValidated = true;
    }
  }

  create() {
    if (this.isUserCreationValidated) {
      this.userService.create();
    }
  }

  changeImg() {
    $('#logo').attr('src', '../../../assets/Images/logo-ONDA2.png');
  }

  restoreImg() {
    $('#logo').attr('src', '../../../assets/Images/logo-ONDA.png');
  }

  isAllowed(){
    let route = location.pathname;
    if (route.includes('/login') || route === '/acceuil') {
      return true;
    }
    return false;
  }
}
