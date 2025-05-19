import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss'],
  standalone:false
})
export class VistaUsuarioComponent  implements OnInit {
  userDt!:UserI;
  usuarioApi: UserI[]=[];

  constructor(
    private userServ: UserServicesService
  ) { }

  ngOnInit():void {
    this.userDt=this.userServ.getDatos();
  }

}
