
import { Injectable } from '@angular/core';
import { Fish } from '../interface/Fish';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FishesService {
  private saucer = new BehaviorSubject<Fish[]>([]);
    saucer$ = this.saucer.asObservable();

    constructor() {
      const guardados = localStorage.getItem('platillos');
      if (guardados) {
        this.saucer.next(JSON.parse(guardados));
      }
    }

    agregarPlatillo(saucer: Fish) {
      const actual = this.saucer.getValue();
      const nuevos = [...actual, saucer];
      this.saucer.next(nuevos);
      localStorage.setItem('platillos', JSON.stringify(nuevos));
    }
      // Agregar estos métodos a la clase foodService
    eliminarPlatillo(saucer: Fish) {
      const actual = this.saucer.getValue();
      const nuevos = actual.filter(p =>
        p.nombre !== saucer.nombre ||
        p.descripcion !== saucer.descripcion ||
        p.precio !== saucer.precio
      );
      this.saucer.next(nuevos);
      localStorage.setItem('platillos', JSON.stringify(nuevos));
    }

    actualizarPlatillo(original: Fish, actualizado: Fish) {
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
