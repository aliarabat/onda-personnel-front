import {Component, OnInit} from '@angular/core';
import {Validator} from '../../validator/validator';
import {UserService} from '../../controller/service/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
  }

  public get loginRequest(){
    return this.userService.loginRequest;
  }

  public set loginRequest(data){
    this.userService.loginRequest = data;
  }



  seConnecter() {
    // @ts-ignore
    $('#email').removeClass("is-invalid");
    // @ts-ignore
    $('#password').removeClass("is-invalid");
    if (!Validator.validateEmail(this.loginRequest.email)) {
      // @ts-ignore
      $('#email').addClass("is-invalid");
    }
    if (!Validator.validatePassword(this.loginRequest.password)) {
      // @ts-ignore
      $('#password').addClass("is-invalid");
    } else {
      this.userService.login();
    }
  }


}
