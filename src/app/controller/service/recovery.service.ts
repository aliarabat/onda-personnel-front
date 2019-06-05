import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SwalUtil} from '../../util/swal-util';
import {User} from '../model/user.model';
import {UrlsUtil} from "../../util/urls-util";

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  private userUrl: string = UrlsUtil.main_user_url + UrlsUtil.url_user;
  private recoveryUrl: string = UrlsUtil.main_user_url + UrlsUtil.url_recovery;

  public recoveryRequest = {email: ''};
  public passwordRecoveryRequest = {userId: 0, newPwd: '', newPwdConfirmation: ''};

  constructor(private http: HttpClient, private router: Router) {
  }

  public goSendLink() {
    this.http.post(this.userUrl + 'password-recovery', this.recoveryRequest.email).subscribe((response) => {
      if (response === 1) {
        SwalUtil.emailSent();
      } else if (response === -3) {
        SwalUtil.unableToConnect();
      } else {
        SwalUtil.unkownError();
      }
    })
  }

  public getUser(token) {
    this.http.get<User>(this.recoveryUrl + 'get-user/' + token).subscribe(response => {
      if (!response) {
        SwalUtil.invalidLink();
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2000)
      } else {
        this.passwordRecoveryRequest.userId = response.id;
        this.recoveryRequest.email = response.email;
      }
    });
  }

  public passwordRecover() {
    console.log(this.passwordRecoveryRequest);
    this.http.put(this.userUrl + 'password-recovery', this.passwordRecoveryRequest).subscribe((response) => {
      if (response === 1) {
        SwalUtil.changesSavedSuccessfully();
        setTimeout(() => this.router.navigate(['login']), 1600)
      } else {
        SwalUtil.unkownError();
      }
    })
  }

}
