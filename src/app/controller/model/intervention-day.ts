import {TimingVo} from './timing.model';

export class InterventionDayVo {
  constructor(public id?:number, public anomaly?:string,public interventionStart?:string,public interventionEnd?:string,public callIntervention?:string, public breakDuration: TimingVo = new TimingVo('',''),public reparationDuration: TimingVo = new TimingVo('',''), public breakNumber?:string,public actions?:string){}

}
