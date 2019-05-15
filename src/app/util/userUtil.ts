import {Router} from '@angular/router';
import {User} from '../controller/model/user.model';
import {Session} from './session';
import {Validator} from '../validator/validator';

export class UserUtil {
  constructor(public router: Router) {
  }

  public detectUserAndRedirect(user: User) {
    Session.store(user, 'loggedUser');
    this.router.navigate(['employes']);
  }

  public logout() {
    Session.remove('loggedUser');
  }

  public static userEmailChangeChecker(oldEmail,newEmail):boolean{
    return Validator.validateEmail(newEmail) && oldEmail === Session.retrieve('loggedUser').email;
  }

  public static userPasswordChangeChecker(oldPassword, newPassword):boolean{
    return oldPassword === newPassword;
  }

}
