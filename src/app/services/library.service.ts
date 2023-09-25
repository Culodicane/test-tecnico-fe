import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  header : any;

  constructor(private http: HttpClient, private cookie:CookieService, private router:Router) {
    this.header =new HttpHeaders({"Authorization":`${this.cookie.get("Bearer")}`});
  }

  getLibrary():Observable<any>{
    return this.http.post(environment.baseUrl + "/library/getAllByUser",null,{
      responseType: 'json',
      headers : this.header
    });
  }

  addLibrary(library : any):Observable<any>{
    return this.http.post(environment.baseUrl + "/library/add",library,{
      responseType: 'json',
      headers : this.header
    });
  }

  updateLibrary(library : any):Observable<any>{
    return this.http.post(environment.baseUrl + "/library/update",library,{
      responseType: 'json',
      headers : this.header
    });
  }

}
