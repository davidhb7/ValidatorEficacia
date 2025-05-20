import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user';

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

  constructor(
    private formBuilderRegistro: FormBuilder,
  ) { 
    this.inicializarUsuario();
  }

  ngOnInit() {
    return;
  }

  inicializarUsuario(){
    this.usuario={
      _id:"",
      cedula:"",
      nombre:"",
      telefono:"",
      ciudad:"",
      foto:"",
      created:""
    };
    this.formGroupRegistro = this.formBuilderRegistro.group({
      cedula:['', [Validators.required,Validators.minLength(6), Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      telefono:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      nombre:['', [Validators.required]],
      ciudad:['', [Validators.required]],
    })
  }

  guardarRegistro(){
    console.log("Ya")
  }

}
