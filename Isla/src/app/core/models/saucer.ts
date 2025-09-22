import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodInterface } from '../interface/foodInterface';

@Injectable({
  providedIn: 'root'
})  
export class Saucer {
  private platillo = new BehaviorSubject<foodInterface[]>([]);
  platillo$ = this.platillo.asObservable();

  constructor() {
    const guardados = localStorage.getItem('platillos');
    if (guardados) {
      this.platillo.next(JSON.parse(guardados));
    }
  }

  agregarPlatillo(platillo: foodInterface) {
    const actual = this.platillo.getValue();
    const nuevos = [...actual, platillo];
    this.platillo.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }

  eliminarPlatillo(platillo: foodInterface) {
    const actual = this.platillo.getValue();
    const nuevos = actual.filter(p => 
      p.nombre !== platillo.nombre || 
      p.descripcion !== platillo.descripcion || 
      p.precio !== platillo.precio
    );
    this.platillo.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }

  actualizarPlatillo(original: foodInterface, actualizado: foodInterface) {
    const actual = this.platillo.getValue();
    const nuevos = actual.map(p => 
      (p.nombre === original.nombre && 
      p.descripcion === original.descripcion && 
      p.precio === original.precio) ? actualizado : p
    );
    this.platillo.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
}