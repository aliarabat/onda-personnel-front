import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GestionEmployeesComponent} from './gestion/gestion-employees/gestion-employees.component';
import {GestionTimingsComponent} from './gestion/gestion-timings/gestion-timings.component';
import {GestionServicesComponent} from './gestion/gestion-services/gestion-services.component';
import {VacationComponent} from './absence/vacation/vacation.component';
import {ReplacementComponent} from './absence/replacement/replacement.component';
import {SkipComponent} from './absence/skip/skip.component';
import {MissionComponent} from './absence/mission/mission.component';
import {SplashComponent} from './access/splash/splash.component';
import {LoginComponent} from './access/login/login.component';
import {GestionHolidaysComponent} from "./gestion/gestion-holidays/gestion-holidays.component";
import {GestionEquipmentComponent} from './dashboard/gestion-equipment/gestion-equipment.component';
import {GestionAnomalyComponent} from './dashboard/gestion-anomaly/gestion-anomaly.component';

const routes: Routes = [

  {path: 'acceuil', component: SplashComponent}, // ROOT DESTINATION
  {path: 'employes', component: GestionEmployeesComponent},
  {path: 'horaires', component: GestionTimingsComponent},
  {path: 'services', component: GestionServicesComponent},
  {path: 'conges', component: VacationComponent},
  {path: 'remplacements', component: ReplacementComponent},
  {path: 'absences', component: SkipComponent},
  {path: 'missions', component: MissionComponent},
  {path: 'joursferies', component: GestionHolidaysComponent},
  {path: 'login', component: LoginComponent},
  {path: 'equipements', component: GestionEquipmentComponent},
  {path: 'anomalies', component:  GestionAnomalyComponent},

  { path: '**', redirectTo: 'acceuil' }, // JUST A CATCH ALL ROUTE

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
