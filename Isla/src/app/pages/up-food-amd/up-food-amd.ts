import { Component } from '@angular/core';
import { Saucer } from '../../core/models/saucer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { foodInterface } from '../../core/interface/foodInterface';

@Component({
  selector: 'app-up-food-amd',
  imports: [CommonModule, FormsModule],
  templateUrl: './up-food-amd.html',
  styleUrl: './up-food-amd.css'
})

export class UpFoodAmd {
  activeSection: String = 'upfood';
    // Agregar estas propiedades a la clase
  ultimosPlatillos: Saucer[] = [];
  platilloEditando: Saucer | null = null;
  esModoEdicion: boolean = false;
  setSection(section: string) {
    this.activeSection = section;

  }
  nombre = '';
  descripcion = '';
  precio!: number;
  imageBase64: string = '';

  constructor(private foodinterface: foodInterface){
    this.foodinterface.saucer$.subscribe(platillos => {
    this.ultimosPlatillos = platillos.slice(-5).reverse(); // Últimos 5, más reciente primero
    });
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


// Método para eliminar platillo
eliminarPlatillo(platillo: Saucer) {
  if (confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
    this.foodinterface.eliminarPlatillo(platillo);
  }
}

  // Método para editar platillo
  editarPlatillo(platillo: Saucer) {
    this.platilloEditando = {...platillo};
    this.nombre = platillo.nombre;
    this.descripcion = platillo.descripcion;
    this.precio = platillo.precio;
    this.imageBase64 = platillo.imagen;
    this.esModoEdicion = true;
  }

  // Modificar el método subirsaucer para manejar edición
  subirsaucer() {
    if (this.esModoEdicion && this.platilloEditando) {
      // Modo edición
      const platilloActualizado: Saucer = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imageBase64
      };
      if(platilloActualizado.nombre == '' || platilloActualizado.descripcion == '' || !platilloActualizado.precio || platilloActualizado.imagen == ''){
        alert("Rellene todos los espacios")
      }else{
      this.foodinterface.actualizarPlatillo(this.platilloEditando, platilloActualizado);
      this.esModoEdicion = false;
      alert("Platillo actualizado exitosamente");
      }
    } else {
        // Modo creación
      const newsaucer: Saucer = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imageBase64
      };
      if(newsaucer.nombre == '' || newsaucer.descripcion == '' || !newsaucer.precio || newsaucer.imagen == ''){
        alert("Rellene todos los espacios")
      }else{
        this.foodinterface.agregarPlatillo(newsaucer);
        alert("Platillo subido exitosamente");
        // Limpiar formulario
        this.nombre = '';
        this.descripcion = '';
        this.precio = 0;
        this.imageBase64 = '';
        this.platilloEditando = null;
      } 
    }   
  }
}