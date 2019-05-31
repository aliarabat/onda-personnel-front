import {Component, OnInit} from '@angular/core';
import {RecoveryService} from "../../../controller/service/recovery.service";
import {Validator} from "../../../validator/validator";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {


  constructor(private recoveryService:RecoveryService) {
  }

  ngOnInit() {
  }

  public get email(){
    return this.recoveryService.recoveryRequest.email;
  }
  public set email(data){
    this.recoveryService.recoveryRequest.email = data;
  }

  goSendLink(){
    // @ts-ignore
    $('#email').removeClass('is-invalid');
    if (!Validator.validateEmail(this.email)) {
      // @ts-ignore
      $('#email').addClass('is-invalid');
    }else{
      this.recoveryService.goSendLink();
    }
  }


}
