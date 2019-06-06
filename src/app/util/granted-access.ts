import {Router} from "@angular/router";
import {Session} from "./session";

export class GrantedAccess {
  public static checkIfUserIsAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Technicien') {
      setTimeout(() => router.navigate(['anomalies']));
      return false;
    }else if (Session.retrieve('loggedUser').rang === 'Responsable'){
      setTimeout(() => router.navigate(['services']));
      return false;
    }
    return true;
  }

  public static checkIfUserIsResponsableOrAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Technicien') {
      setTimeout(() => router.navigate(['anomalies']), 0);
      return false;
    }
    return true;
  }

  public static async checkIfUserIsTechniqueOrAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Responsable') {
      setTimeout(() => router.navigate(['services']), 0);
      return false;
    }
    return true;
  }
}
