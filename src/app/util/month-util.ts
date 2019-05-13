import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthUtil {

  private static _months:Array<string>=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']
  private static _days:Array<string>=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  public static getMonth(index:number){
    return this._months[index];
  }

  static get months(): Array<string> {
    return this._months;
  }

  static day(index:number) {
    return this._days[index];
  }
}
