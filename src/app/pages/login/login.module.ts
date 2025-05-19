import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { VistaUsuarioComponent } from 'src/app/components/vista-usuario/vista-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage,
    VistaUsuarioComponent
  ]
})
export class LoginPageModule {
}
