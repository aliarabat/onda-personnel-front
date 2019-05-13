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
  public userUtil: UserUtil = new UserUtil(this.router);

  constructor(private http: HttpClient, public router:Router) {

  }

  login() {
    this.http.post<User>(this.url + 'login', this.loginRequest).subscribe(response => {
      this.userUtil.detectUserAndRedirect(response);
    });

  }

  logout(){
    this.userUtil.logout();
  }

}
