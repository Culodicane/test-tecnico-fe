import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService : LoginService, private cookie:CookieService,private router:Router,
              private dialog: MatDialog ){

  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe({
        next  : data => {
          this.cookie.set( 'Bearer', data.token );
          this.router.navigate(["library"]) .then(() => {
          });
        },

        error : error => {
          const dialogRef = this.dialog.open(LoginDialogComponent, {
            data: error.error
          });
          dialogRef.afterClosed().subscribe(result => {
          });
          //console.log(error.error);
        }
      })
    }
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}


