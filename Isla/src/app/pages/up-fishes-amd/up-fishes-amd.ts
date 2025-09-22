import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FishesService } from '../../core/service/FishesService';
import { Fish } from '../../core/interface/Fish';
@Component({
  selector: 'app-up-fishes-amd',
  imports: [CommonModule,FormsModule,],
  templateUrl: './up-fishes-amd.html',
  styleUrl: './up-fishes-amd.css'
})
export class UpFishesAmd {
  activeSection: String = 'upfood';
     // Agregar estas propiedades a la clase
   ultimosPlatillos: Fish[] = [];
   platilloEditando: Fish | null = null;
   esModoEdicion: boolean = false;
   setSection(section: string) {
     this.activeSection = section;

   }
   nombre = '';
   descripcion = '';
   precio!: number;
   imageBase64: string = '';

   constructor(private foodservice: FishesService){
     this.foodservice.saucer$.subscribe(platillos => {
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


 // Agregar al constructor después de la suscripción


 // Método para eliminar platillo
 eliminarPlatillo(platillo: Fish) {
   if (confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
     this.foodservice.eliminarPlatillo(platillo);
   }
 }

   // Método para editar platillo
   editarPlatillo(platillo: Fish) {
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
       const platilloActualizado: Fish = {
         nombre: this.nombre,
         descripcion: this.descripcion,
         precio: this.precio,
         imagen: this.imageBase64
       };

       this.foodservice.actualizarPlatillo(this.platilloEditando, platilloActualizado);
       this.esModoEdicion = false;
       alert("Platillo actualizado exitosamente");
     } else {
       // Modo creación
       const newsaucer: Fish = {
         nombre: this.nombre,
         descripcion: this.descripcion,
         precio: this.precio,
         imagen: this.imageBase64
       };

       this.foodservice.agregarPlatillo(newsaucer);
       alert("Platillo subido exitosamente");
     }

     // Limpiar formulario
     this.nombre = '';
     this.descripcion = '';
     this.precio = 0;
     this.imageBase64 = '';
     this.platilloEditando = null;
   }
}
