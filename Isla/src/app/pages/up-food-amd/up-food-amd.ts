import { Component } from '@angular/core';
import { foodService } from '../../core/service/foodService';
import { Saucer } from '../../core/models/saucer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-up-food-amd',
  imports: [CommonModule, FormsModule],
  templateUrl: './up-food-amd.html',
  styleUrl: './up-food-amd.css'
})
export class UpFoodAmd {
  activeSection: String = 'upfood';

  setSection(section: string) {
    this.activeSection = section;

  }
  nombre = '';
  descripcion = '';
  precio!: number;
  imageBase64: string = '';

  constructor(private foodservice: foodService){}

  OnfileSelected(event: any){
    const file = event.target.files[0];
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