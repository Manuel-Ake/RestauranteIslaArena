/*export interface Saucer {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string; // guardaremos la URL base64 de la imagen
}*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodInterface } from '../interface/foodInterface';

@Injectable({
  providedIn: 'root'
})  
export class Saucer {
  private food = new BehaviorSubject<foodInterface[]>([]);
  food$ = this.food.asObservable();

  constructor() {
    const guardados = localStorage.getItem('platillos');
    if (guardados) {
      this.food.next(JSON.parse(guardados));
    }
  }

  agregarPlatillo(foodInterface: foodInterface) {
    const actual = this.food.getValue();
    const nuevos = [...actual, foodInterface];
    this.food.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
    // Agregar estos métodos a la clase foodService
  eliminarPlatillo(food: foodInterface) {
    const actual = this.food.getValue();
    const nuevos = actual.filter(p => 
      p.nombre !== food.nombre || 
      p.descripcion !== food.descripcion || 
      p.precio !== food.precio
    );
    this.food.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }

  actualizarPlatillo(original: foodInterface, actualizado: foodInterface) {
    const actual = this.food.getValue();
    const nuevos = actual.map(p => 
      (p.nombre === original.nombre && 
      p.descripcion === original.descripcion && 
      p.precio === original.precio) ? actualizado : p
    );
    this.food.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
}