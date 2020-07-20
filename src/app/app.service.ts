import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

 
  private baseUrl = 'https://findfalcone.herokuapp.com'
  constructor(
    private http:HttpClient
  ) { }

  getPlanets(){
    let url = this.baseUrl + '/planets';
    return this.http.get(url);
  }
  getvehicle(){
    let url = this.baseUrl + '/vehicles';
    return this.http.get(url);
  }

  getToken(){
    let url = this.baseUrl+ '/token'
    let body = {};
   return this.http.post(url,body,{headers:{'Accept' : 'application/json'}})
  }

  findFalcone(object:any){
    let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type','application/json');
    let url = this.baseUrl +'/find'
    return this.http.post(url,object,{headers:headers})
  }

}
