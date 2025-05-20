import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserI } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  formGroupLogin!: FormGroup;
  usuario?: UserI;
  errorMnjs: string = '';
  cedulaBuscar: string = '';
  consultaRealizada: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private usuarioService: UserApiService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formGroupLogin = this.fb.group({
      cedula: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  validarUsuario() {
    if (this.formGroupLogin.invalid) return;

    this.cedulaBuscar = this.formGroupLogin.get('cedula')?.value;
    this.consultarApi(this.cedulaBuscar);
  }

  consultarApi(cedula: string) {this.usuarioService.getUserByCedula(cedula).subscribe({
      next: (res) => {
        this.consultaRealizada = true;

        if (res.status === 'ok' && res.result.length > 0) {
          alert('Usuario encontrado. Puedes continuar con el proceso.');
          this.usuario = res.result[0];
          this.errorMnjs = '';
        } else {
          alert('No estás registrado.”');
          this.router.navigate(['/register'], {
            queryParams: { cedula: this.cedulaBuscar }
          });
        }

        this.formGroupLogin.reset();
      },
      error: (err) => {
        this.consultaRealizada = true;
        this.usuario = undefined;
        this.errorMnjs = 'Error al obtener datos: ' + err.message;
        this.formGroupLogin.reset();
      },
    });
  }
}

