import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) {
    setTimeout(() => {
      this.goToLoginPage();
    }, 2000);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    for (let i = 0; i <= 100; i += 5) {
      setTimeout(() => {
        // @ts-ignore
        $('#prog-bar').css('width', i + '%');
      }, 1000);
    }
  }
}
