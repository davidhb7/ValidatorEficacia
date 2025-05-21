import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserI } from 'src/app/models/user';
import { FotoStoreageService } from 'src/app/services/foto-storeage.service';
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
  usuario!: UserI;

  //VARIABLES
  ciudadSeleccionada: string = '';
  ciudadOtra: string = '';
  ciudadFinal: string = '';
  mnjWhatsapp: string = '';
  linkWhatsapp: string = "https://wa.me/573001234567?text=";
  numeroDestino: number = 3001234567;
  linkFotoPresente:string= "";

  @ViewChild('otraCiudadInput') otraCiudadInput!: ElementRef;
  consultaRealizada!: boolean;
  errorMnjs: string="";
  constructor(
    private formBuilderRegistro: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private userServ: UserApiService,
    private fotoServ: FotoStoreageService,
    private loadingCtrl: LoadingController
  ) {
    this.inicializarUsuario();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cedula = params['cedula'];
      this.usuario.cedula = cedula
      if (cedula) {
        this.formGroupRegistro.patchValue({ cedula });
      }
    });
  }

  inicializarUsuario() {
    this.usuario = {
      cedula: "",
      nombre: "",
      telefono: "",
      ciudad: "",
      foto: "",
      created: "",
      otraCiudad: ""
    };
    this.formGroupRegistro = this.formBuilderRegistro.group({
      cedula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      nombre: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      otraCiudad: ['']
    })
  }


  guardarRegistro() {
    const datosFormulario = this.formGroupRegistro.value;
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
    this.usuario = {
      cedula: datosAEnviar.cedula,
      nombre: datosAEnviar.nombre,
      telefono: datosAEnviar.telefono,
      ciudad: ciudadFinal,
      foto: "",
      created: "",
      otraCiudad: ciudadFinal
    };
    console.log('Datos finales:', datosAEnviar);
    this.userServ.registrarUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado exitosamente:', respuesta);
        alert('Usuario registrado. Serás redirigido al login.');
        this.router.navigate(['/login']);
        this.enviarMensaje();
      },
      error: (err) => {
        this.consultaRealizada = true;
        this.errorMnjs = 'Error al obtener datos: ' + err.message;
        console.error('Error al registrar usuario:', err);
      }
    });
  }

  enviarMensaje() {
    this.mnjWhatsapp = `
    Hola, mis datos son:
    Cedula:${this.usuario.cedula}
    Telefono:${this.usuario.telefono}
    Foto:${this.linkFotoPresente}
    `;
    let url = this.linkWhatsapp + this.mnjWhatsapp
    window.open(url, '_blank');

  }


 
  async subirFoto(event: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo foto...',
      spinner: 'crescent',
      backdropDismiss: false
    });
    await loading.present();

    try {
      const nombreRutaCarpetaStorage = this.usuario.cedula;
      const nombreFotoEnStorage = "fotoUsuario" + this.usuario.cedula;
      const archivo = event.target.files[0];

      const res = await this.fotoServ.cargarFotoFireStorage(
        archivo,
        nombreRutaCarpetaStorage,
        nombreFotoEnStorage
      );

      this.usuario.foto = res;
      console.log("link:", res);
      this.linkFotoPresente=res
    } catch (error) {
      console.error('Error al subir foto:', error);
    } finally {
      await loading.dismiss();
    }
  }


  guardarCiudad(inputRef: any) {
    let ciudadSeleccionada = this.formGroupRegistro.get('ciudad')?.value;

    if (ciudadSeleccionada === 'Otra') {
      ciudadSeleccionada = inputRef.value;
      this.ciudadFinal = inputRef.value;
      this.usuario.ciudad = inputRef.value;
      this.usuario.ciudad = this.ciudadFinal
      console.log(this.ciudadFinal)
    } else {
      this.ciudadFinal = ciudadSeleccionada;
      this.usuario.ciudad = ciudadSeleccionada;
      console.log("ciudd final:", this.ciudadFinal)
    }

    console.log('Ciudad final:', this.ciudadFinal);
  }


}
