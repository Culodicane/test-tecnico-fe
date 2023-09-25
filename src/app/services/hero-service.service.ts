import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  header : HttpHeaders = new HttpHeaders;

  constructor(private http: HttpClient) {

  }

  public sendMessage(): Observable<any>{
      return this.http.post<any>("backend/send", null, {
        responseType : "json",
        headers : this.header
      })
  }

}
