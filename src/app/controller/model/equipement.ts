import {TimingVo} from './timing.model';
import {TypeVo} from './type';

export class EquipementVo {
  constructor(public id?:number, public name?:string, public expectedBreakPeriodMaintenance: TimingVo = new TimingVo('',''), public typeVo:TypeVo=new TypeVo()){}

}
