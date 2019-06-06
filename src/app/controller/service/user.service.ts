import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {UserUtil} from '../../util/userUtil';
import {Router} from '@angular/router';
import {SwalUtil} from '../../util/swal-util';
import {UrlsUtil} from '../../util/urls-util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string = UrlsUtil.main_user_url + UrlsUtil.url_user;

  public userData: User;
  public user = new User(0, '', '', '', '', '', null, null, '');
  public loginRequest = {email: '', password: ''};
  public emailChangeRequest = {userId: 0, originalEmail: '', newEmail: ''};
  public pwdChangeRequest = {userId: 0, oldPassword: '', newPassword: ''};
  public userDataChangeRequest = {userId: 0, username: '', firstName: '', lastName: '',};
  public userUtil: UserUtil = new UserUtil(this.router);
  public userModifiedData: User = new User(0, '', '', '', '', '', null, null, '', false);
  public users: Array<User> = new Array<User>();

  constructor(public http: HttpClient, public router: Router) {
  }

  login() {
    this.http.post<User>(this.url + 'login', this.loginRequest).subscribe(response => {
      if (response) {
        if (response.isBlocked) {
          SwalUtil.blockedUser();
        } else {
          this.userUtil.detectUserAndRedirect(response);
        }
      } else {
        SwalUtil.wrongEmailOrPassword();
      }
    });

  }

  logout() {
    this.userUtil.logout();
  }

  emailUpdate() {
    this.http.put(this.url + 'email', this.emailChangeRequest).subscribe(response => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
      } else if (response === -2) {
        SwalUtil.emailNotFound();
      } else {
        SwalUtil.unkownError();
      }
    });
  }

  passwordUpdate() {
    this.http.put(this.url + 'password', this.pwdChangeRequest).subscribe(response => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
      } else if (response === -3) {
        SwalUtil.oldPasswordNotCorrect();
      } else {
        SwalUtil.unkownError();
      }
    });
  }

  update() {
    this.http.put(this.url + 'data', this.userDataChangeRequest).subscribe(response => {
      if (response == 1) {
        UserUtil.updateUser(this.userDataChangeRequest);
        this.userData = UserUtil.updateUser(this.userDataChangeRequest);
        SwalUtil.changesSavedSuccessfully();
      } else {
        SwalUtil.unkownError();
      }
    });
  }

  create() {
    this.user.joinDate = new Date();
    this.http.post(this.url, this.user).subscribe(response => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
      } else if (response === -1 || response === -2) {
        SwalUtil.userAlreadyExists();
      } else {
        SwalUtil.unkownError();
      }
    });
  }

  public getAll() {
    this.http.get<Array<User>>(this.url + 'get-all').subscribe((response) => {
      this.users = response;
    });
  }

  public block(user: User) {
    user.isBlocked = true;
    this.http.put(this.url, user).subscribe((response) => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
        this.getAll();
      } else {
        SwalUtil.unkownError();
      }
    });
  }

  public unblock(user: User) {
    user.isBlocked = false;
    this.http.put(this.url, user).subscribe((response) => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
        this.getAll();
      } else {
        SwalUtil.unkownError();
      }
    });
  }


}
