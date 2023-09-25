import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  header : any;

  constructor(private http: HttpClient, private cookie:CookieService, private router:Router) {
    this.header =new HttpHeaders({"Authorization":`${this.cookie.get("Bearer")}`});
  }

  getBookDetails(bookId : any):Observable<any>{
    console.log("ecco l'id : " + bookId);
    this.header =new HttpHeaders({"Authorization":`${this.cookie.get("Bearer")}`});
    return this.http.post<any>(environment.baseUrl + "/book/getById",bookId,{
      responseType: 'json',
      headers : this.header
    });
  }

  getAll():Observable<any>{
    return this.http.post(environment.baseUrl + "/book/getAll",null,{
      responseType: 'json',
      headers : this.header
    });
  }

}
