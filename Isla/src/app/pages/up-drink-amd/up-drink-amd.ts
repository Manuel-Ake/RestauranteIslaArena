import { Component } from '@angular/core';
import { drinkService } from '../../core/service/DrinkService';
import { Drinkinterface } from '../../core/interface/drink';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-up-drink-amd',
  imports: [CommonModule,FormsModule],
  templateUrl: './up-drink-amd.html',
  styleUrl: './up-drink-amd.css'
})
export class UpDrinkAmd {
  activeSection: String = 'upfood';
       // Agregar estas propiedades a la clase
     ultimosPlatillos: Drinkinterface[] = [];
     platilloEditando: Drinkinterface | null = null;
     esModoEdicion: boolean = false;
     setSection(section: string) {
       this.activeSection = section;

     }
     nombre = '';
     descripcion = '';
     precio!: number;
     imageBase64: string = '';

     constructor(private foodservice: drinkService){
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
   // Método para eliminar platillo
   eliminarPlatillo(platillo: Drinkinterface) {
     if (confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
       this.foodservice.eliminarPlatillo(platillo);
     }
   }

     // Método para editar platillo
     editarPlatillo(platillo: Drinkinterface) {
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
         const platilloActualizado: Drinkinterface = {
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
         const newsaucer: Drinkinterface = {
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
