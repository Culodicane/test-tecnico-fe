import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgIf} from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        NgIf,
        RouterModule,
        MatListModule,
        MatCardModule
    ],

})
export class NavbarComponent {

  logout() {
    console.log("lele")
    this.cookie.delete("Bearer","/");
    window.location.reload();
  }

  constructor(private loginService : LoginService, private cookie:CookieService,private router:Router){

    router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        this.loginService.getUserDetails().subscribe({
          next : (userEntity) => {
            this.name = JSON.parse(userEntity).name;
            this.lastname = JSON.parse(userEntity).lastName;
            this.type = JSON.parse(userEntity).type;
          },
          error : (error) => {console.log(error)}
        })
      }
    })

    /*
    this.router.events.pipe(mergeMap(ev => ev instanceof NavigationStart? this.loginService.getUserDetails() : new Observable)).subscribe(name => {
      console.log("cazzo");
    });
    */

  }

  name = '';
  lastname = '';
  type = '';

  showFiller = false;

  fun(){

    this.router.events.pipe(mergeMap(name =>
      this.loginService.getUserDetails()
    )).subscribe((result => {
      console.log('ecco il res: ' + result);
    }))

  }


}



