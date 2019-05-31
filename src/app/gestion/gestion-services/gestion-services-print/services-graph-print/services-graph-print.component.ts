import {Component, OnInit} from '@angular/core';
import {WorkService} from "../../../../controller/service/work.service";
import {Router} from "@angular/router";
import {MiddleWare} from "../../../../util/middle-ware";
import {EmployeeServiceService} from "../../../../controller/service/employee-service.service";

@Component({
  selector: 'app-services-graph-print',
  templateUrl: './services-graph-print.component.html',
  styleUrls: ['./services-graph-print.component.css']
})
export class ServicesGraphPrintComponent implements OnInit {

  constructor(private workService: WorkService, private employeeService:EmployeeServiceService, private router: Router) {
  }

  ngOnInit() {
    MiddleWare.checkIfUserIsLogged(this.router);
    this.employeeService.findAllEmployesExist();
  }

  get employees(){
    return this.employeeService.allEmployees.filter(emp=>emp.type.toLowerCase()==='technique');
  }
  get dateByYear() {
    return this.workService.dateByYear;
  }

  get employeeToGraph() {
    return this.workService.employeeToGraph;
  }

  date() {
    return new Date();
  }

  searchWorkToGraph() {
    this.workService.searchWorkToGraph();
  }

  get workToGraph(){
    return this.workService.workToGraph;
  }

  formatDate(workDetailDate: string) {
    return new Date(workDetailDate);
  }

  printGraph(fullYear: number, matricule: string) {
    this.workService.printGraph(fullYear, matricule);
  }
}
