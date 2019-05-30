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

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  constructor(private http: HttpClient) {
  }

  private _url = 'http://localhost:8099/personnel-api/personnels/work/';
  private _url_workdetail = 'http://localhost:8099/personnel-api/personnels/workDetail/';
  private _listEmployeesByYear: Array<WorkVo> = new Array<WorkVo>();
  private _listEmployeesByYearUntouched: Array<WorkVo> = [];
  private _listEmployeesByMonth: Array<WorkVo> = new Array<WorkVo>();
  private _workVoSearch: WorkVo = new WorkVo({}, {});

  private _workDetailVoToUpdate: WorkDatailVo = new WorkDatailVo(0, '', '', {hour: '', minute: ''}, {
    hour: '',
    minute: ''
  });

  private _dateByAnnee: DateModel = new DateModel(new Date().getFullYear());
  private _dateForPrinting: DateModel = new DateModel(new Date().getFullYear());
  private _yearOfTheMonth: number;
  private _monthOfTheYear: number;

  //args for graph
  private _dateByYear: DateModel = new DateModel(new Date().getFullYear());
  private _employeeToGraph: EmployeeVo = new EmployeeVo(0,'');
  private _workToGraph: WorkVo = new WorkVo({},{});

  private _employee: EmployeeVo = new EmployeeVo();

  findWorkByYear(matricule?: string) {
    this.http.get<Array<WorkVo>>(this._url + 'annee/' + this._dateByAnnee.year).subscribe(
      data => {
        if (data != null) {
          this._listEmployeesByYearUntouched = data;
          if (matricule === undefined || matricule === '') {
            this._listEmployeesByYear = data;
          } else {
            this._listEmployeesByYear = data.filter(w => w.employeeVo.matricule === matricule);
          }
        } else {
          this._listEmployeesByYearUntouched = [];
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
        if (data != null) {
          this._listEmployeesByYear = data;
        } else {
          this._listEmployeesByYear = [];
        }
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
      SwalUtil.insert("'le mois");
    } else {
      this.http.get<WorkVo>(this._url + 'worktoprint/year/' + this._dateForPrinting.year + '/month/' + this._dateForPrinting.month).subscribe(
        data => {
          if (data != null) {
            this._workVoSearch = data;
          } else {
            this._workVoSearch = new WorkVo({}, {});
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  get listEmployeesByYear(): Array<WorkVo> {
    return this._listEmployeesByYear;
  }

  set listEmployeesByYear(value: Array<WorkVo>) {
    this._listEmployeesByYear = value;
  }

  get listEmployeesByMonth(): Array<WorkVo> {
    return this._listEmployeesByMonth;
  }

  set listEmployeesByMonth(value: Array<WorkVo>) {
    this._listEmployeesByMonth = value;
  }


  get dateByAnnee(): DateModel {
    return this._dateByAnnee;
  }

  set dateByAnnee(value: DateModel) {
    this._dateByAnnee = value;
  }

  get listEmployeesByYearUntouched(): Array<WorkVo> {
    return this._listEmployeesByYearUntouched;
  }

  set listEmployeesByYearUntouched(value: Array<WorkVo>) {
    this._listEmployeesByYearUntouched = value;
  }

  checkWorkDetailVoAttrs(w: WorkDatailVo) {
    this._workDetailVoToUpdate.id = w.id;
    if (this._workDetailVoToUpdate.pan === '') {
      this._workDetailVoToUpdate.pan = w.pan;
    }
    if (this._workDetailVoToUpdate.hn.hour === '') {
      this._workDetailVoToUpdate.hn.hour = w.hn.hour;
    }
    if (this._workDetailVoToUpdate.hn.minute === '') {
      this._workDetailVoToUpdate.hn.minute = w.hn.minute;
    }
    if (this._workDetailVoToUpdate.hjf.hour === '') {
      this._workDetailVoToUpdate.hjf.hour = w.hjf.hour;
    }
    if (this._workDetailVoToUpdate.hjf.minute === '') {
      this._workDetailVoToUpdate.hjf.minute = w.hjf.minute;
    }
  }

  lisSortByEmployee(matricule: string) {
    if (this._listEmployeesByYearUntouched.length === 0) {
      this.findWorkByYear(matricule);
    } else {
      console.log('awwdi rah data aslan kayna');
      this._listEmployeesByYear = this._listEmployeesByYearUntouched.filter(w => w.employeeVo.matricule === matricule);
    }
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get url_workdetail(): string {
    return this._url_workdetail;
  }

  set url_workdetail(value: string) {
    this._url_workdetail = value;
  }


  get employee(): EmployeeVo {
    return this._employee;
  }

  set employee(value: EmployeeVo) {
    this._employee = value;
  }


  get yearOfTheMonth(): number {
    return this._yearOfTheMonth;
  }

  set yearOfTheMonth(value: number) {
    this._yearOfTheMonth = value;
  }

  get monthOfTheYear(): number {
    return this._monthOfTheYear;
  }

  set monthOfTheYear(value: number) {
    this._monthOfTheYear = value;
  }

  reinitializeSearchByYearForm() {
    this._dateByAnnee = new DateModel(new Date().getFullYear());
  }

  setlistEmployeesByYearUntouchedToNormal() {
    this._listEmployeesByYear = this._listEmployeesByYearUntouched;
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

  searchWorkToGraph() {
    if (this._employeeToGraph.matricule==='') {
      SwalUtil.select("l'employé");
    }else if (this._dateByYear.year===undefined){
      SwalUtil.insert("l'année");
    } else{
      this.http.get<WorkVo>(this._url+"emloyetograph/matricule/"+this._employeeToGraph.matricule+"/year/"+this._dateByYear.year).subscribe(data => !!data ? this._workToGraph = data : this._workToGraph = new WorkVo({},{}));
      console.log(this._workToGraph);
    }
  }

  get workToGraph(): WorkVo {
    return this._workToGraph;
  }

  set workToGraph(value: WorkVo) {
    this._workToGraph = value;
  }

  printGraph() {
    let headers = new HttpHeaders();
    const applicationType = 'application/pdf';
    headers = headers.set('Accept', applicationType);

    const httpOptions = {
      responseType: 'blob' as 'arrayBuffer',
      headers: headers
    };
    // @ts-ignore
    return this.http.get(this._url + "printgraph/matricule/" + this._employeeToGraph.matricule + "/year/" + this._dateByYear.year , httpOptions).subscribe((result) => {
      downloadfile(result, applicationType, "Graphe-" + this._employeeToGraph.matricule + "-" + this._dateByYear.year + "." + 'pdf');
    });
  }
}

