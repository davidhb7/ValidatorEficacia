import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  //OBJETOS-CLASES
  formGroupLogin!: FormGroup;
  usuario!:UserI;

  constructor(
    private formBuilderLogin: FormBuilder,
    private alertController: AlertController
  ) { 
    this.inicializarUsuario();
  }

  ngOnInit() {
    return;
  }

  inicializarUsuario(){
    this.usuario={
      cedula:"",
      nombre:"",
      telefono:"",
      ciudad:"",
      foto:"",
    };
    this.formGroupLogin = this.formBuilderLogin.group({
      cedula:['', [Validators.required,Validators.minLength(6), Validators.maxLength(10),Validators.pattern('[0-9]*')]],
    })
  }

  validarUsuario(){
    console.log(this.usuario.cedula);
    this.mostrarAviso();
    this.formGroupLogin.reset();
  }

  async mostrarAviso() {
  const alert = await this.alertController.create({
    header: 'Atención',
    message: 'Usuario validado.',
    buttons: ['OK'],
  });

  await alert.present();
}


}
