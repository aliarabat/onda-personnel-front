import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GestionComponent} from './gestion/gestion.component';
import {GestionEmployeesComponent} from './gestion/gestion-employees/gestion-employees.component';
import {GestionEmployeesCreateComponent} from './gestion/gestion-employees/gestion-employees-create/gestion-employees-create.component';
import {GestionEmployeesListComponent} from './gestion/gestion-employees/gestion-employees-list/gestion-employees-list.component';
import {GestionTimingsComponent} from './gestion/gestion-timings/gestion-timings.component';
import {GestionTimingListComponent} from './gestion/gestion-timings/gestion-timing-list/gestion-timing-list.component';
import {GestionTimingCreateComponent} from './gestion/gestion-timings/gestion-timing-create/gestion-timing-create.component';
import {GestionServicesComponent} from './gestion/gestion-services/gestion-services.component';
import {GestionServicesCreateComponent} from './gestion/gestion-services/gestion-services-create/gestion-services-create.component';
import {GestionServiceListComponent} from './gestion/gestion-services/gestion-services-list/gestion-service-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {VacationComponent} from './absence/vacation/vacation.component';
import {VacationCreateComponent} from './absence/vacation/vacation-create/vacation-create.component';
import {VacationListComponent} from './absence/vacation/vacation-list/vacation-list.component';
import {MissionComponent} from './absence/mission/mission.component';
import {SkipComponent} from './absence/skip/skip.component';
import {ReplacementComponent} from './absence/replacement/replacement.component';
import {MissionListComponent} from './absence/mission/mission-list/mission-list.component';
import {MissionCreateComponent} from './absence/mission/mission-create/mission-create.component';
import {ReplacementCreateComponent} from './absence/replacement/replacement-create/replacement-create.component';
import {ReplacementListComponent} from './absence/replacement/replacement-list/replacement-list.component';
import {SkipListComponent} from './absence/skip/skip-list/skip-list.component';
import {SkipCreateComponent} from './absence/skip/skip-create/skip-create.component';
import { AccessComponent } from './access/access.component';
import { SplashComponent } from './access/splash/splash.component';
import { LoginComponent } from './access/login/login.component';
import { AdminPanelComponent } from './access/admin-panel/admin-panel.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { SidebarComponent } from './parts/sidebar/sidebar.component';
import {GestionServicesPrintComponent} from './gestion/gestion-services/gestion-services-print/gestion-services-print.component';
import {GestionHolidaysCreateComponent} from "./gestion/gestion-holidays/gestion-holidays-create/gestion-holidays-create.component";
import {GestionHolidaysListComponent} from "./gestion/gestion-holidays/gestion-holidays-list/gestion-holidays-list.component";
import {GestionHolidaysComponent} from "./gestion/gestion-holidays/gestion-holidays.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionAnomalyComponent } from './dashboard/gestion-anomaly/gestion-anomaly.component';
import { GestionAnomalyListComponent } from './dashboard/gestion-anomaly/gestion-anomaly-list/gestion-anomaly-list.component';
import {GestionAnomalyCreateComponent} from './dashboard/gestion-anomaly/gestion-anomaly-create/gestion-anomaly-create.component';
import { GestionEquipmentComponent } from './dashboard/gestion-equipment/gestion-equipment.component';
import { GestionEquipmentCreateComponent } from './dashboard/gestion-equipment/gestion-equipment-create/gestion-equipment-create.component';
import { GestionEquipmentListComponent } from './dashboard/gestion-equipment/gestion-equipment-list/gestion-equipment-list.component';
import { GestionAnomalyPrintComponent } from './dashboard/gestion-anomaly/gestion-anomaly-print/gestion-anomaly-print.component';
import { GestionEquipmentTypeComponent } from './dashboard/gestion-equipment/gestion-equipment-type/gestion-equipment-type.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionComponent,
    GestionEmployeesComponent,
    GestionEmployeesCreateComponent,
    GestionEmployeesListComponent,
    GestionTimingsComponent,
    GestionTimingListComponent,
    GestionTimingCreateComponent,
    GestionServicesComponent,
    GestionServicesCreateComponent,
    GestionServiceListComponent,
    VacationComponent,
    VacationCreateComponent,
    VacationListComponent,
    MissionComponent,
    SkipComponent,
    ReplacementComponent,
    MissionListComponent,
    MissionCreateComponent,
    ReplacementCreateComponent,
    ReplacementListComponent,
    SkipListComponent,
    SkipCreateComponent,
    AccessComponent,
    SplashComponent,
    LoginComponent,
    AdminPanelComponent,
    NavbarComponent,
    SidebarComponent,
    GestionServicesPrintComponent,
    GestionHolidaysComponent,
    GestionHolidaysCreateComponent,
    GestionHolidaysListComponent,
    DashboardComponent,
    GestionAnomalyComponent,
    GestionAnomalyListComponent,
    GestionAnomalyCreateComponent,
    GestionEquipmentComponent,
    GestionEquipmentCreateComponent,
    GestionEquipmentListComponent,
    GestionAnomalyPrintComponent,
    GestionEquipmentTypeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
