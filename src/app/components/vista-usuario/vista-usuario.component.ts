import { Component, OnInit } from '@angular/core';
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


  constructor(
    private usuarioService: UserApiService,
  ) { 
    
  }

  ngOnInit() {
    const cedula = '1234567892';
    const token = 'Token 790cfdfb568c8ca697c72f52d8fab5af63ede025';

    this.usuarioService.getUserByCedula(cedula, token).subscribe({
      next: (response) => {
        if (response.status === 'ok' && response.result.length > 0) {
          this.usuario = response.result[0];
        } else {
          this.errorMnjs = 'No se encontró usuario con esa cédula.';
        }
      },
      error: (error) => {
        this.errorMnjs = 'Error al obtener datos: ' + error.message;
      }
    });
  }
}
