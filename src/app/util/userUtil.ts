import {Router} from '@angular/router';
import {User} from '../controller/model/user.model';
import {Session} from './session';

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

}
