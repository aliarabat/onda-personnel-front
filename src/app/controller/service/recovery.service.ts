import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SwalUtil} from '../../util/swal-util';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  private userUrl: string = 'http://localhost:8098/user-api/user/';
  private recoveryUrl: string = 'http://localhost:8098/user-api/recovery/';
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
      }else{
        SwalUtil.unkownError();
      }
    })
  }

}
