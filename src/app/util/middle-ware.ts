import {Session} from './session';
import {Router} from '@angular/router';

export class MiddleWare {

  public static checkIfUserIsLogged(router: Router) {
      if (!Session.retrieve('loggedUser')) {
        router.navigate(['login']);
      }
  }
  public static checkIfUserIsNotLogged(router: Router) {
      if (Session.retrieve('loggedUser')) {
        router.navigate(['employes']);
      }
  }
}
