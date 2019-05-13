import {Session} from './session';
import {Router} from '@angular/router';

export class MiddleWare {

  public static checkIfUserIsLogged(router: Router) {
    router.events.subscribe((): void => {
      if (!Session.retrieve('loggedUser')) {
        router.navigate(['login']);
      }
    });
  }
}
