import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(this.storage.get('isLoggedin'))
      this.storage.get('isLoggedin')
        .then(res => {
          console.log(res); 
          if (res) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['login']);
          }
        })


      //   this.authenticationService.authenticationState.subscribe(state => {
      //     if(state) {
      //       //this.router.navigate(['home', 'list']);
      //       this.router.navigate(['login']);
      //     } else {
      //       this.router.navigate(['login']);
      //     }
      //   })
      // });
      // }
    })
  }
}