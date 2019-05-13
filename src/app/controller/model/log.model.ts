import {User} from './user.model';

export class Log {
  constructor(public id?: number, public user?: User, public logDate?: Date, public body?: string) {
  }
}
