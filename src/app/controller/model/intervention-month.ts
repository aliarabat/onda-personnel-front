import {EquipementVo} from './equipement';
import {InterventionDayVo} from './intervention-day';
import {TimingVo} from './timing.model';


export class InterventionMonthVo {
  constructor(public id?:number, public dateIntervention?:string, public equipementVo: EquipementVo = new EquipementVo(),public interventionPartDaysVo: Array<InterventionDayVo>=[],public functionalityTimeWanted: TimingVo = new TimingVo('',''),public functionalityTimeAchieved: TimingVo = new TimingVo('',''),public currentBreakPeriodMaintenance: TimingVo = new TimingVo('',''),public tbf?:number){}



}
