import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor(private http: HttpClient, private url: string) {
  }

  public static getData() {

  }

  public static postData() {

  }

  public static putData() {

  }

  public static deleteData() {

  }
}
