import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService : LoginService, private cookie:CookieService,private router:Router){

  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe({
        next  : data => {
          this.cookie.set( 'Bearer', data.token );
          this.router.navigate(["library"]) .then(() => {
          });
        },
        error : error => {console.log(error.error)}
      })
    }
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
