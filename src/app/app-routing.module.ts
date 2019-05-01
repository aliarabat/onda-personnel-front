import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GestionEmployeesComponent} from './gestion/gestion-employees/gestion-employees.component';
import {GestionTimingsComponent} from './gestion/gestion-timings/gestion-timings.component';
import {GestionServicesComponent} from './gestion/gestion-services/gestion-services.component';
import {VacationComponent} from './absence/vacation/vacation.component';
import {ReplacementComponent} from './absence/replacement/replacement.component';
import {SkipComponent} from './absence/skip/skip.component';
import {MissionComponent} from './absence/mission/mission.component';

const routes: Routes = [
  {path: 'employes', component: GestionEmployeesComponent},
  {path: 'horaires', component: GestionTimingsComponent},
  {path: 'services', component: GestionServicesComponent},
  {path: 'conges', component: VacationComponent},
  {path: 'remplacements', component: ReplacementComponent},
  {path: 'absences', component: SkipComponent},
  {path: 'missions', component: MissionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
