import {TimingVo} from "./timing.model";

export class DetailVo {

  constructor( public reference?: string, public wording?: string, public startingTimeVo: TimingVo = new TimingVo('',''), public endingTimeVo: TimingVo = new TimingVo('',''), public pan?: string,  public mode?: string) {}
  public heVo?: TimingVo = new TimingVo('','')
  public hnVo?: TimingVo = new TimingVo('','')
  public id?:number
}
