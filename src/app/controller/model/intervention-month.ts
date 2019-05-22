import {EquipementVo} from './equipement';
import {InterventionDayVo} from './intervention-day';


export class InterventionMonthVo {
  constructor(public id?:number, public dateIntervention?:string, public equipementVo: EquipementVo = new EquipementVo(),public interventionPartDaysVo: Array<InterventionDayVo>=[]){}

}
