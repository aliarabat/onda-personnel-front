export class User {
  constructor(public id?: number, public username?: string, public email?: string, public password?: string, public firstName?: string, public lastName?: string, public birthDate?: Date, public joinDate?: Date, public rang?:string,public isBlocked?:boolean) {
  }
}
