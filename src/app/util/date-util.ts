export class DateUtil {

  static formatDate(workDetailDate: string) {
    return new Date(workDetailDate);
  }

  static formatTime(hours: string, minutes:string) {
    let d= new Date();
    d.setHours(parseInt(hours));
    d.setMinutes(parseInt(minutes));
    return d.toLocaleTimeString();
  }
}
