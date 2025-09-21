import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Saucer } from '../models/saucer';

@Injectable({
  providedIn: 'root'
})  
export class foodService {
  private saucer = new BehaviorSubject<Saucer[]>([]);
  saucer$ = this.saucer.asObservable();

  constructor() {
    const guardados = localStorage.getItem('platillos');
    if (guardados) {
      this.saucer.next(JSON.parse(guardados));
    }
  }

  agregarPlatillo(saucer: Saucer) {
    const actual = this.saucer.getValue();
    const nuevos = [...actual, saucer];
    this.saucer.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
    // Agregar estos métodos a la clase foodService
  eliminarPlatillo(saucer: Saucer) {
    const actual = this.saucer.getValue();
    const nuevos = actual.filter(p => 
      p.nombre !== saucer.nombre || 
      p.descripcion !== saucer.descripcion || 
      p.precio !== saucer.precio
    );
    this.saucer.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }

  actualizarPlatillo(original: Saucer, actualizado: Saucer) {
    const actual = this.saucer.getValue();
    const nuevos = actual.map(p => 
      (p.nombre === original.nombre && 
      p.descripcion === original.descripcion && 
      p.precio === original.precio) ? actualizado : p
    );
    this.saucer.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
}