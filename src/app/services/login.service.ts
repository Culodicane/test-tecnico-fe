import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  header : any;

  constructor(private http: HttpClient, private cookie:CookieService, private router:Router) {

  }

  login(loginData:any):Observable<any>{
    return this.http.post<any>(environment.baseUrl + "/login/login",loginData,{ responseType: "json" });
  }

  getUserDetails():Observable<any>{
    this.header =new HttpHeaders({"Authorization":`${this.cookie.get("Bearer")}`});
    return this.http.post(environment.baseUrl + "/login/getUserDetails",null,{
      responseType: 'text',
      headers : this.header
    });
  }

  checkToken(){
    if (this.cookie.check("Bearer")){
      this.header =new HttpHeaders({"Authorization":`${this.cookie.get("Bearer")}`});
      this.http.post<any>(environment.baseUrl + "/login/checkToken",null,{
        responseType: "json",
        headers : this.header }).subscribe({
          next : (data)=>{
            console.log(data)
          },
          error : (err) => {
            this.cookie.delete("Bearer","/");
            window.location.reload();
          }
        })
    }
    else{
      this.router.navigate(["/login"]);
    }
  }

}
