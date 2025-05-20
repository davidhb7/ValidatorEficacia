import { Component, Input, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss'],
  standalone:false
})
export class VistaUsuarioComponent  implements OnInit {

  usuario!:UserI;
  errorMnjs!:string;

  @Input() cedulaConsulta!: string;

  constructor(
    private usuarioService: UserApiService,
  ) { 
    
  }

  ngOnInit():void{
    this.usuarioService.getUserByCedula(this.cedulaConsulta).subscribe({
      next: (res) => {
        console.log('Respuesta completa', res);

        if (res.status === 'ok' && res.result.length > 0) {
          this.usuario = res.result[0];
        } else {
          this.errorMnjs = 'No se encontró usuario.';
        }
      },
      error: (err) => {
        this.errorMnjs = 'Error al obtener datos: ' + err.message;
      }
    });

  }
}
