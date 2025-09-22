import { Component } from '@angular/core';
import { foodInterface } from '../../core/interface/foodInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../core/service/foodService';

@Component({
  selector: 'app-up-food-amd',
  imports: [CommonModule, FormsModule],
  templateUrl: './up-food-amd.html',
  styleUrl: './up-food-amd.css'
})
export class UpFoodAmd {
  activeSection: String = 'upfood';
  ultimosPlatillos: foodInterface[] = [];
  platilloEditando: foodInterface | null = null;
  esModoEdicion: boolean = false;

  nombre = '';
  descripcion = '';
  precio!: number;
  imageBase64: string = '';

  constructor(private foodService: FoodService){
    this.foodService.saucer$.subscribe((platillos: foodInterface[]) => {
      this.ultimosPlatillos = platillos.slice(-5).reverse();
    });
  }

  setSection(section: string) {
    this.activeSection = section;
  }

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

  eliminarPlatillo(platillo: foodInterface) {
    if (confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
      this.foodService.eliminarPlatillo(platillo);
    }
  }

  editarPlatillo(platillo: foodInterface) {
    this.platilloEditando = platillo; // No usar spread, mantener referencia original
    this.nombre = platillo.nombre;
    this.descripcion = platillo.descripcion;
    this.precio = platillo.precio;
    this.imageBase64 = platillo.imagen;
    this.esModoEdicion = true;
  }

  subirsaucer() {
    if (this.esModoEdicion && this.platilloEditando) {
      // Modo edición
      const platilloActualizado: foodInterface = {
        id: this.platilloEditando.id, // Mantener el ID original
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imageBase64
      };

      if(platilloActualizado.nombre == '' || platilloActualizado.descripcion == '' || !platilloActualizado.precio || platilloActualizado.imagen == ''){
        alert("Rellene todos los espacios");
      } else {
        this.foodService.actualizarPlatillo(this.platilloEditando, platilloActualizado);
        this.esModoEdicion = false;
        alert("Platillo actualizado exitosamente");
        this.limpiarFormulario();
      }
    } else {
      // Modo creación
      const newsaucer: foodInterface = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imageBase64
      };

      if(newsaucer.nombre == '' || newsaucer.descripcion == '' || !newsaucer.precio || newsaucer.imagen == ''){
        alert("Rellene todos los espacios");
      } else {
        this.foodService.agregarPlatillo(newsaucer);
        alert("Platillo subido exitosamente");
        this.limpiarFormulario();
      }
    }
  }

  private limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.imageBase64 = '';
    this.platilloEditando = null;
    this.esModoEdicion = false;
  }
}