import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserI } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  //OBJETOS-CLASES
  formGroupRegistro!: FormGroup;
  usuario!:UserI;

  //VARIABLES
  ciudadSeleccionada: string = '';
  ciudadOtra: string = '';
  ciudadFinal: string = '';

  //(@ViewChild('otraCiudadInput', { static: false }) otraCiudadInput!: ElementRef;
  @ViewChild('otraCiudadInput') otraCiudadInput!: ElementRef;
  constructor(
    private formBuilderRegistro: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private userServ: UserApiService
  ) { 
    this.inicializarUsuario();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cedula = params['cedula'];
      this.usuario.cedula=cedula
      if (cedula) {
        this.formGroupRegistro.patchValue({ cedula });
      }
    });
  }

  inicializarUsuario(){
    this.usuario={
      cedula:"",
      nombre:"",
      telefono:"",
      ciudad:"",
      foto:"",
      created:"",
      otraCiudad:""
    };
    this.formGroupRegistro = this.formBuilderRegistro.group({
      cedula:['', [Validators.required,Validators.minLength(6), Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      telefono:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      nombre:['', [Validators.required]],
      ciudad:['', [Validators.required]],
      otraCiudad: ['']
    })
  }





  guardarRegistro() {
  const datosFormulario = this.formGroupRegistro.value;

  // Acceder de forma segura al campo 'otraCiudad'
  const ciudadSeleccionada = datosFormulario.ciudad;
  const otraCiudad = this.formGroupRegistro.get('otraCiudad')?.value || null;

  if (ciudadSeleccionada === 'Otra' && !otraCiudad) {
    console.warn('El campo de otra ciudad no está disponible aún o está vacío');
    return;
  }

  const ciudadFinal = ciudadSeleccionada === 'Otra' ? otraCiudad : ciudadSeleccionada;

  const datosAEnviar = {
    cedula: datosFormulario.cedula,
    nombre: datosFormulario.nombre,
    telefono: datosFormulario.telefono,
    ciudad: ciudadFinal
  };
  this.usuario={
      cedula:datosAEnviar.cedula,
      nombre:datosAEnviar.nombre,
      telefono:datosAEnviar.telefono,
      ciudad:ciudadFinal,
      foto:"",
      created:"",
      otraCiudad:ciudadFinal
    };

  console.log('Datos finales:', datosAEnviar);
  this.userServ.registrarUsuario(this.usuario).subscribe({
    next: (respuesta) => {
      console.log('Usuario registrado exitosamente:', respuesta);
      // Aquí podrías redirigir o limpiar el formulario si quieres
      alert('Usuario registrado. Serás redirigido al registro.');
          this.router.navigate(['/login'])
    },
    error: (err) => {
      console.error('Error al registrar usuario:', err);
    }
  });
}





  guardarCiudad(inputRef: any) {
    let ciudadSeleccionada = this.formGroupRegistro.get('ciudad')?.value;

    if (ciudadSeleccionada === 'Otra') {
      ciudadSeleccionada=inputRef.value;
      this.ciudadFinal = inputRef.value;
      this.usuario.ciudad=inputRef.value;
      this.usuario.ciudad=this.ciudadFinal
      console.log(this.ciudadFinal)
    } else {
      this.ciudadFinal = ciudadSeleccionada;
      this.usuario.ciudad=ciudadSeleccionada;
      console.log("ciudd final:",this.ciudadFinal)
    }

    console.log('Ciudad final:', this.ciudadFinal);
  }


}
