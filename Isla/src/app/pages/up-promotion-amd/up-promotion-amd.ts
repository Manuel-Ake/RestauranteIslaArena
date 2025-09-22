import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { PromoInterface } from '../../core/interface/PromoInterface';
import { PeomoService } from '../../core/service/PromoService';
import { CommonModule} from '@angular/common';
@Component({
  selector: 'app-up-promotion-amd',
  imports: [CommonModule,FormsModule],
  templateUrl: './up-promotion-amd.html',
  styleUrl: './up-promotion-amd.css'
})
export class UpPromotionAmd {
  activeSection: String = 'upfood';
       // Agregar estas propiedades a la clase
     ultimosPlatillos: PromoInterface[] = [];
     platilloEditando: PromoInterface | null = null;
     esModoEdicion: boolean = false;
     setSection(section: string) {
       this.activeSection = section;

     }
     nombre = '';
     descripcion = '';
     precio!: number;
     imageBase64: string = '';

     constructor(private foodservice: PeomoService){
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
   eliminarPlatillo(platillo: PromoInterface) {
     if (confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
       this.foodservice.eliminarPlatillo(platillo);
     }
   }

     // Método para editar platillo
     editarPlatillo(platillo: PromoInterface) {
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
         const platilloActualizado: PromoInterface = {
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
         const newsaucer: PromoInterface = {
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
