import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  olvideContrasena = false;
  correo: string = '';
  contrasena: string = '';
  acept(){
    if(this.correo=='' || this.contrasena==''){
      alert('Por favor llene todos los campos');
    }else{
      alert('Registro exitoso');
      //this.router.navigate(['/gestor']);
    }
  }

  mostrarRecuperar: boolean = false; // controla qué bloque mostrar

  toggleRecuperar() {
    this.mostrarRecuperar = !this.mostrarRecuperar;
  }

  ingresar() {
    console.log('Ingresando con', this.correo, this.contrasena);
  }

  enviarCodigo() {
    console.log('Enviando código...');
  }
}
