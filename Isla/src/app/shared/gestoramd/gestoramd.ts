import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/*import { Router } from '@angular/router';*/
import { Saucer } from '../../core/models/saucer';
import { foodService } from '../../core/service/foodService';

@Component({
  standalone: true,
  selector: 'app-gestoramd',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestoramd.html',
  styleUrl: './gestoramd.css'
})
export class Gestoramd {
  // para navegar en las secciones
  activeSection: string = 'resumen';

  setSection(section: string) {
    this.activeSection = section;
  }

  nombre = '';
  descripcion = '';
  precio!: number;
  imageBase64: string = '';

  constructor(private foodservice:foodService){}

  OnfileSelected(event: any){
    const file = event.target.file[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () =>{
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  subirsaucer(){
    const newsaucer: Saucer = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.imageBase64
    };

    alert("Platillo subido exitosamente" + newsaucer);
    this.foodservice.agregarPlatillo(newsaucer);

  }
}
