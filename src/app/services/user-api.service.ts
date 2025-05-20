import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private urlGetApi=  'https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV?cedula=';
  

  constructor(
    private httpC:HttpClient
  ) { }

  getUserByCedula(cedula: string, token: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
    });

    // Construimos la URL con el parámetro cedula en query params
    const url = `${this.urlGetApi}${cedula}`;

    return this.httpC.get<ApiResponse>(url, { headers });
  }

 




}
