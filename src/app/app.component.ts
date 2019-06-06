import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onda-personnel';
  route: string;

  constructor() {
    this.route = location.pathname;
  }

}
