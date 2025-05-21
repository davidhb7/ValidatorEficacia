import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  apiServ:string=environment.apiEnviroment;
  directApi=""


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
    const directapi="https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV"
    console.log(directapi,headers,params)
    return this.httpC.get(directapi, { headers,params });
  }


  registrarUsuario(usr:UserI){
    const headers = new HttpHeaders({
      'Authorization': `Token 790cfdfb568c8ca697c72f52d8fab5af63ede025`,
    });
    const directapi="https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV"
    console.log(directapi,headers)
    return this.httpC.post(directapi,usr,{headers})
  }


}