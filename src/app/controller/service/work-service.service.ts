import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { WorkVo } from '../model/work.model';
import {DateModel} from '../model/date.model';
import {WorkDatailVo} from '../model/work-datail.model';
import {EmployeeVo} from '../model/employee.model';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class WorkServiceService {

  constructor(private http:HttpClient) { }

  private _url='http://localhost:8099/personnel-api/personnels/work/';
  private _url_workdetail='http://localhost:8099/personnel-api/personnels/workDetail/';
  private _listEmployeesByYear:Array<WorkVo>=new Array<WorkVo>();
  private _listEmployeesByYearUntouched:Array<WorkVo>=[];
  private _listEmployeesByMonth:Array<WorkVo>=new Array<WorkVo>();
  private _listEmployeesByDay:Array<WorkVo>=new Array<WorkVo>();

  private _workDetailVoToUpdate:WorkDatailVo=new WorkDatailVo(0, '','',{hour:'',minute:''},{hour:'',minute:''});

  private _dateByAnnee:DateModel=new DateModel(new Date().getFullYear());
  private _dateByMonth:DateModel=new DateModel();
  private _yearOfTheMonth: number;
  private _monthOfTheYear: number ;


  private _employee:EmployeeVo=new EmployeeVo();


  findWorkByYear(matricule?:string){
    this.http.get<Array<WorkVo>>(this._url+"annee/"+this._dateByAnnee.year).subscribe(
      data=>{
        if (data!=null){
          this._listEmployeesByYearUntouched=data;
          if (matricule===undefined|| matricule===''){
            this._listEmployeesByYear=data;
            console.log("awddi rah jit mn serveur");
          } else{
            this._listEmployeesByYear=data.filter(w=>w.employeeVo.matricule===matricule);
            console.log("awddi rah mamchitch l serveur");
          }
        }else{
          this._listEmployeesByYearUntouched=[];
          this._listEmployeesByYear=[];
        }
      },error=>{
        console.log(error);
      }
    );
  }


  findWorksByMonth(){
  this.http.get<Array<WorkVo>>(this._url + 'year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month).subscribe(
    data=>{
      if (data!=null){
        this._listEmployeesByYear=data;
      }else{
        this._listEmployeesByYear=[];
      }
    },error=>{
      console.log(error);
    }
  );
}

findWorkByEmployeeAndMonthAndYear(matricule:string){
  this.http.get<WorkVo>(this._url + 'matricule/' + matricule + '/year/' + this._dateByAnnee.year + '/month/' + this._dateByAnnee.month).subscribe(
    data=>{
      if (data!=null){
        this._listEmployeesByYear=new Array<WorkVo>();
        this._listEmployeesByYear.push(data);
      }else{
        this._listEmployeesByYear=[];
      }
    },error=>{
      console.log(error);
    }
  );

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

  get dateByMonth(): DateModel {
    return this._dateByMonth;
  }

  set dateByMonth(value: DateModel) {
    this._dateByMonth = value;
  }



  get workDetailVoToUpdate(): WorkDatailVo {
    return this._workDetailVoToUpdate;
  }

  set workDetailVoToUpdate(value: WorkDatailVo) {
    this._workDetailVoToUpdate = value;
  }

  get listEmployeesByYearUntouched(): Array<WorkVo> {
    return this._listEmployeesByYearUntouched;
  }

  set listEmployeesByYearUntouched(value: Array<WorkVo>) {
    this._listEmployeesByYearUntouched = value;
  }

  checkWorkDetailVoAttrs(w:WorkDatailVo){
    this._workDetailVoToUpdate.id=w.id;
    if (this._workDetailVoToUpdate.pan===''){
      this._workDetailVoToUpdate.pan=w.pan;
    }
    if (this._workDetailVoToUpdate.hn.hour===''){
      this._workDetailVoToUpdate.hn.hour=w.hn.hour;
    }
    if (this._workDetailVoToUpdate.hn.minute===''){
      this._workDetailVoToUpdate.hn.minute=w.hn.minute;
    }
    if (this._workDetailVoToUpdate.hjf.hour===''){
      this._workDetailVoToUpdate.hjf.hour=w.hjf.hour;
    }
    if (this._workDetailVoToUpdate.hjf.minute===''){
      this._workDetailVoToUpdate.hjf.minute=w.hjf.minute;
    }
  }

  updateWorkDetail(w:WorkDatailVo) {
    this.checkWorkDetailVoAttrs(w);
    this.http.put<WorkDatailVo>(this._url_workdetail, this._workDetailVoToUpdate).subscribe(
      data=>{
        if (data!=null){
          this._listEmployeesByYear.map(w=>w.workDetailVo.id===data.id?w.workDetailVo=data:w)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Sauvegardé avec succés'
          })
        }
      },error => {
        console.log(error);
      }
    );
    this._workDetailVoToUpdate=new WorkDatailVo(0, '','',{hour:'',minute:''},{hour:'',minute:''});
  }

  lisSortByEmployee(matricule: string) {
    if (this._listEmployeesByYearUntouched.length===0){
      this.findWorkByYear(matricule);
    }else{
      console.log("awwdi rah data aslan kayna")
      this._listEmployeesByYear=this._listEmployeesByYearUntouched.filter(w=>w.employeeVo.matricule===matricule);
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
    this._dateByAnnee=new DateModel();
  }

  setlistEmployeesByYearUntouchedToNormal() {
    console.log("awddi rah drt set");
    this._listEmployeesByYear=this._listEmployeesByYearUntouched;
  }
}
