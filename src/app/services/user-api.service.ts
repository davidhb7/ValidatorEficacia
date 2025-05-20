import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {


  constructor(
    private httpC:HttpClient
  ) { }

  getUserByCedula(cc:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token 790cfdfb568c8ca697c72f52d8fab5af63ede025`,
    });
    const params = new HttpParams()
      // .set('_id', '682bbd13430509c3db24287b')
      .set('cedula', cc);
    const url = '/api';
    return this.httpC.get(url, { headers,params });
  }


  registrarUsuario(usr:UserI){
    const headers = new HttpHeaders({
      'Authorization': `Token 790cfdfb568c8ca697c72f52d8fab5af63ede025`,
    });
    const url = '/api';
    return this.httpC.post(url,usr,{headers})
  }


}