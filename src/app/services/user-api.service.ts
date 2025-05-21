import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  apiDirecta:string="https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV"
  apiEnv=environment.apiEficacia


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
      const apidir=environment.apiEficacia
    return this.httpC.get(apidir, { headers,params });
  }


  registrarUsuario(usr:UserI){
    const headers = new HttpHeaders({
      'Authorization': `Token 790cfdfb568c8ca697c72f52d8fab5af63ede025`,
    });
    const apidir=environment.apiEficacia
    return this.httpC.post(apidir,usr,{headers})
  }


}