import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:9001'

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`,JSON.stringify(body), this.requestOptions)
    .pipe(catchError(this.formatErrors));
  }

}
