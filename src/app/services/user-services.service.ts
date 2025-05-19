import { Injectable } from '@angular/core';
import { UserI } from '../models/user';
import { usuarioData } from '../data/data.users';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  //DECLARA Y ALOJA
  private datoBase:UserI=usuarioData;

  constructor(

  ) { }

  getDatos():UserI{
    return this.datoBase;
  }
}
