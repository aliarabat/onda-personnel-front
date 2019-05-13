export class Session {
  public static store(object: any, key: string) {
    if (object === null || object === undefined) {
      return -1;
    } if (key === null || key === undefined) {
      return -2;
    }else {
      localStorage.setItem(key, JSON.stringify(object));
      return 1;
    }
  }

  public static modify(object: any, key: string) {
    if (object === null || object === undefined) {
      return -1;
    }if (key === null || key === undefined) {
      return -2;
    } else {
      localStorage.setItem(key, JSON.stringify(object));
      return 1;
    }
  }

  public static retrieve(key:string){
    if (key === null || key === undefined) {
      return null;
    }
    return JSON.parse(localStorage.getItem(key));
  }

  public static remove(key: string) {
    if (key === null || key === undefined) {
      return -1;
    } else {
      localStorage.removeItem(key);
      return 1;
    }
  }
}
