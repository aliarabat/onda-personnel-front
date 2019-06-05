import {Router} from "@angular/router";
import {Session} from "./session";

export class GrantedAccess {
  public static async checkIfUserIsAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Technicien') {
      await setTimeout(() => router.navigate(['anomalies']), 1);
      return false;
    }else if (Session.retrieve('loggedUser').rang === 'Responsable'){
      await setTimeout(() => router.navigate(['services']), 1);
      return false;
    }
    return true;
  }

  public static async checkIfUserIsResponsableOrAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Technicien') {
      await setTimeout(() => router.navigate(['anomalies']), 1);
      return false;
    }
    return true;
  }

  public static async checkIfUserIsTechniqueOrAdmin(router: Router) {
    if (Session.retrieve('loggedUser').rang === 'Responsable') {
      await setTimeout(() => router.navigate(['services']), 1);
      return false;
    }
    return true;
  }
}
