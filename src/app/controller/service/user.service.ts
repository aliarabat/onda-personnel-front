import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {UserUtil} from '../../util/userUtil';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string = 'http://localhost:8098/user-api/user/';
  public user: User = new User(0, '', '', '', '', '', null, null);
  public loginRequest = {email: '', password: ''};
  public emailChangeRequest = {userId: 0, originalEmail: '', newEmail: ''};
  public pwdChangeRequest = {userId: 0, oldPassword: '', newPassword: ''};
  public userDataChangeRequest = {userId: 0, username: '', firstName: '', lastName: '',};
  public userUtil: UserUtil = new UserUtil(this.router);
  public userModifiedData: User = new User(0, '', '', '', '', '', null, null, '');

  constructor(private http: HttpClient, public router: Router) {}

  login() {
    this.http.post<User>(this.url + 'login', this.loginRequest).subscribe(response => {
      if(response){
        this.userUtil.detectUserAndRedirect(response);
      }
    });

  }

  logout() {
    this.userUtil.logout();
  }

  emailUpdate() {
    console.log(this.emailChangeRequest);
    this.http.put(this.url+'email', this.emailChangeRequest).subscribe(response => {
      console.log(response);
    });
  }

  passwordUpdate(){
    console.log(this.pwdChangeRequest);
    this.http.put(this.url+'password', this.pwdChangeRequest).subscribe(response => {
      console.log(response);
    });
  }

  update(){
    this.http.put(this.url+'data', this.userDataChangeRequest).subscribe(response => {
      console.log(response);
    });
  }



}
