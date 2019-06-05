import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WorkVo} from '../model/work.model';
import {DateModel} from '../model/date.model';
import {WorkDatailVo} from '../model/work-datail.model';
import {EmployeeVo} from '../model/employee.model';
import Swal from 'sweetalert2';
import {SwalUtil} from "../../util/swal-util";
import {downloadfile} from "../../util/downloadfile-util";
import {MonthUtil} from "../../util/month-util";
import {UrlsUtil} from "../../util/urls-util";

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  constructor(private http: HttpClient) {
  }

  private _main_url = UrlsUtil.main_personnel_url;
  private _url = this._main_url + UrlsUtil.url_work;
  private _url_workdetail = this._main_url + UrlsUtil.url_workDetail;

  private _listEmployeesByYear: Array<WorkVo> = new Array<WorkVo>();
  private _workVoSearch: WorkVo = new WorkVo({}, {});

  private _dateByAnnee: DateModel = new DateModel(new Date().getFullYear());
  private _dateForPrinting: DateModel = new DateModel(new Date().getFullYear());

  //args for graph
  private _dateByYear: DateModel = new DateModel(new Date().getFullYear());
  private _employeeToGraph: EmployeeVo = new EmployeeVo(0, '');
  private _workToGraph: WorkVo = new WorkVo({}, {});

  private _employee: EmployeeVo = new EmployeeVo();

  private _employeeSearchToStats: EmployeeVo = new EmployeeVo(0, '');
  private _yearStats: DateModel = new DateModel(new Date().getFullYear());

  findWorkByYear(matricule?: string) {
    this.http.get<Array<WorkVo>>(this._url + 'annee/' + this._dateByAnnee.year).subscribe(
      data => {
        if (data != null) {
          matricule === undefined || matricule === '' ? this._listEmployeesByYear = data : this._listEmployeesByYear = data.filter(w => w.employeeVo.matricule === matricule);
        } else {
          this._listEmployeesByYear = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }

  findWorksByMonth() {
    this.http.get<Array<WorkVo>>(this._url + 'year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month).subscribe(
      data => {
        data ? this._listEmployeesByYear = data : this._listEmployeesByYear = [];
      }, error => {
        console.log(error);
      }
    );
  }

  findWorkByEmployeeAndMonthAndYear(matricule: string) {
    this.http.get<Array<WorkVo>>(this._url + 'matricule/' + matricule + '/year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month).subscribe(
      data => {
        if (data != null) {
          this._listEmployeesByYear = new Array<WorkVo>();
          this._listEmployeesByYear = data;
        } else {
          this._listEmployeesByYear = [];
        }
      }, error => {
        console.log(error);
      }
    );
  }

  public searchWorkToPrint() {
    if (this._dateForPrinting.year === null || this._dateForPrinting.year === undefined) {
      SwalUtil.insert("l'année");
    } else if (this._dateForPrinting.month === null || this._dateForPrinting.month === undefined) {
      SwalUtil.insert("le mois");
    } else {
      this.http.get<WorkVo>(this._url + 'worktoprint/year/' + this._dateForPrinting.year + '/month/' + this._dateForPrinting.month).subscribe(
        data => {
          data ? this._workVoSearch = data : this._workVoSearch = new WorkVo({}, {});
        }, error => {
          console.log(error);
        }
      );
    }
  }


  reinitializeSearchByYearForm() {
    this._dateByAnnee = new DateModel(new Date().getFullYear());
  }

  async print(fullYear: number, month: number) {
    // inputOptions can be an object or Promise
    const {value: type} = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'pdf': 'PDF',
        'xlsx': 'XLSX'
      },
      inputPlaceholder: 'Select une format',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'pdf') {
            resolve();
          } else if (value === 'xlsx') {
            resolve()
          } else {
            resolve('Merci de selectionner une format');
          }
        });
      }
    });

    if (type) {
      let headers = new HttpHeaders();
      let applicationType = '';
      if (type === 'pdf') {
        applicationType = 'application/pdf';
        headers = headers.set('Accept', applicationType);
      } else {
        applicationType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        headers = headers.set('Accept', applicationType);
      }
      const httpOptions = {
        responseType: 'blob' as 'arrayBuffer',
        headers: headers
      };
      // @ts-ignore
      return this.http.get(this._url + "generatedoc/year/" + fullYear + "/month/" + (month + 1) + "/type/" + type, httpOptions).subscribe((result) => {
        downloadfile(result, applicationType, "etat_elements" + MonthUtil.getMonth(month) + fullYear + "." + type);
      });
    }
  }

  searchWorkToGraph() {
    if (this._employeeToGraph.matricule === '' || this._employeeToGraph.matricule === undefined) {
      SwalUtil.select("l'employé");
    } else if (this._dateByYear.year === undefined || this._dateByYear.year === null) {
      SwalUtil.insert("l'année");
    } else {
      this.http.get<WorkVo>(this._url + "emloyetograph/matricule/" + this._employeeToGraph.matricule + "/year/" + this._dateByYear.year).subscribe(data => !!data ? this._workToGraph = data : this._workToGraph = new WorkVo({}, {}));
    }
  }

  printGraph(fullyear: number, matricule: string) {
    let headers = new HttpHeaders();
    const applicationType = 'application/pdf';
    headers = headers.set('Accept', applicationType);

    const httpOptions = {
      responseType: 'blob' as 'arrayBuffer',
      headers: headers
    };
    // @ts-ignore
    return this.http.get(this._url + "printgraph/matricule/" + matricule + "/year/" + fullyear, httpOptions).subscribe((result) => {
      downloadfile(result, applicationType, "Graphe-" + matricule + "-" + fullyear + "." + 'pdf');
    });
  }

  searchEmployeeSats() {
    return this.http.get<Array<WorkVo>>(this._url + "countall/year/" + new Date().getFullYear());
  }

  get listEmployeesByYear(): Array<WorkVo> {
    return this._listEmployeesByYear;
  }

  set listEmployeesByYear(value: Array<WorkVo>) {
    this._listEmployeesByYear = value;
  }

  get dateByAnnee(): DateModel {
    return this._dateByAnnee;
  }

  set dateByAnnee(value: DateModel) {
    this._dateByAnnee = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get employee(): EmployeeVo {
    return this._employee;
  }

  set employee(value: EmployeeVo) {
    this._employee = value;
  }

  get workVoSearch(): WorkVo {
    return this._workVoSearch;
  }

  set workVoSearch(value: WorkVo) {
    this._workVoSearch = value;
  }

  get dateForPrinting(): DateModel {
    return this._dateForPrinting;
  }

  set dateForPrinting(value: DateModel) {
    this._dateForPrinting = value;
  }

  get dateByYear(): DateModel {
    return this._dateByYear;
  }

  set dateByYear(value: DateModel) {
    this._dateByYear = value;
  }

  get employeeToGraph(): EmployeeVo {
    return this._employeeToGraph;
  }

  set employeeToGraph(value: EmployeeVo) {
    this._employeeToGraph = value;
  }

  get workToGraph(): WorkVo {
    return this._workToGraph;
  }

  set workToGraph(value: WorkVo) {
    this._workToGraph = value;
  }

  get employeeSearchToStats(): EmployeeVo {
    return this._employeeSearchToStats;
  }

  set employeeSearchToStats(value: EmployeeVo) {
    this._employeeSearchToStats = value;
  }


  get yearStats(): DateModel {
    return this._yearStats;
  }

  set yearStats(value: DateModel) {
    this._yearStats = value;
  }


}

