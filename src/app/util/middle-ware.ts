import {Session} from './session';
import {Router} from '@angular/router';

export class MiddleWare {

  public static checkIfUserIsLogged(router: Router) {
      if (!Session.retrieve('loggedUser')) {
        setTimeout(()=>router.navigate(['login']),1200);
        return false;
      }
      return true;
  }

  public static checkIfUserIsNotLogged(router: Router):boolean {
      if (Session.retrieve('loggedUser')) {
        setTimeout(()=>router.navigate(['employes']),1000);
        //router.navigate(['employes']);
        return true
      }
      return false;
  }
}
