import {Component, OnInit} from '@angular/core';
import {RecoveryService} from "../../../controller/service/recovery.service";
import {ActivatedRoute} from "@angular/router";
import {Validator} from "../../../validator/validator";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  public isValid = false;

  constructor(private recoveryService: RecoveryService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.getEmail(params.token))
  }

  public get recoveryRequest() {
    return this.recoveryService.recoveryRequest;
  }

  public set recoveryRequest(data) {
    this.recoveryService.recoveryRequest = data;
  }

  public get passwordRecoveryRequest() {
    return this.recoveryService.passwordRecoveryRequest;
  }

  public set passwordRecoveryRequest(data) {
    this.recoveryService.passwordRecoveryRequest = data;
  }

  getEmail(token) {
    this.recoveryService.getUser(token);
  }

  ngOnInit() {
    console.log(location.pathname)
  }

  passwordRecoverValidate() {
    // @ts-ignore
    $('#pwdRecNew').removeClass('is-invalid');
    // @ts-ignore
    $('#pwdRecNewConf').removeClass('is-invalid');
    if (!Validator.validatePassword(this.passwordRecoveryRequest.newPwd)) {
      // @ts-ignore
      $('#pwdRecNew').addClass('is-invalid');
    } else if (!Validator.validatePasswordConfirmation(this.passwordRecoveryRequest.newPwd, this.passwordRecoveryRequest.newPwdConfirmation)) {
      // @ts-ignore
      $('#pwdRecNewConf').addClass('is-invalid');
    } else {
      this.isValid = true;
    }
  }

  passwordRecover(){
    if(this.isValid){
      this.recoveryService.passwordRecover();
    }

  }
}
