export class UrlsUtil {
  // urls for the presonnel project
  //zuul_server_url
  // public static readonly zuul_server_url = 'http://localhost:9004/microservice-onda-';

  //Urls for Zuul
  //public static readonly main_personnel_url = UrlsUtil.zuul_server_url + 'personnel/personnel-api/personnels/';
  //public static readonly main_personnel_url = 'https://onda-personnel.herokuapp.com/personnel-api/personnels/';
  public static readonly main_personnel_url = 'http://localhost:8099/personnel-api/personnels/';
  public static readonly url_employee = 'employee/';
  public static readonly url_Detail = 'Detail/';
  public static readonly url_day = 'day/';
  public static readonly url_work = 'work/';
  public static readonly url_holiday = 'holiday/';
  public static readonly url_dayDetail = 'dayDetail/';
  public static readonly url_mission = 'mission/';
  public static readonly url_skip = 'skip/';
  public static readonly url_vacation = 'vacation/';
  public static readonly url_workDetail = 'workDetail/';
  public static readonly url_replacement = 'workDetail/';

  // urls for the dashboard project
  //Urls for Zuul
  //public static readonly main_dashboard_url = UrlsUtil.zuul_server_url + 'dashboard/dashboard-api/dashboards/';
  //public static readonly main_dashboard_url = 'https://onda-dashboard.herokuapp.com/dashboard-api/dashboards/';
  public static readonly main_dashboard_url = 'http://localhost:8097/dashboard-api/dashboards/';
  public static readonly url_equipement = 'equipement/';
  public static readonly url_interventionDay = 'interventionDay/';
  public static readonly url_type = 'type/';
  public static readonly url_interventionMonth = 'interventionMonth/';

  // urls for user project
  //Urls for Zuul
 // public static readonly main_user_url = UrlsUtil.zuul_server_url + 'user/user-api/';
  //public static readonly main_user_url = 'https://onda-global.herokuapp.com/user-api/';
  public static readonly main_user_url = 'http://localhost:8098/user-api/';
  public static readonly url_user = 'user/';
  public static readonly url_recovery = 'recovery/';
}
