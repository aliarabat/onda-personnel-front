export class DateUtil {

  static formatDate(workDetailDate: string) {
    return new Date(workDetailDate);
  }

  public static horaire(hour: string, minute: string) {
    const hour1: number = parseInt(hour);
    const minute1: number = parseInt(minute);

    if (minute1 <= 9 && minute1 >= 0 && hour1 <= 9 && hour1 >= 0) {
      return '0' + hour + ':' + '0' + minute
    } else if (minute1 <= 9 && minute1 >= 0) {
      return hour + ':' + '0' + minute
    } else if (hour1 <= 9 && hour1 >= 0) {
      return '0' + hour + ':' + minute
    } else {
      return hour + ':' + minute
    }
  }
}
