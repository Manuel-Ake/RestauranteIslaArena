import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drinkinterface } from '../interface/drink';


@Injectable({
  providedIn: 'root'
})
export class drinkService {
  private saucer = new BehaviorSubject<Drinkinterface[]>([]);
  saucer$ = this.saucer.asObservable();

  constructor() {
    const guardados = localStorage.getItem('platillos');
    if (guardados) {
      this.saucer.next(JSON.parse(guardados));
    }
  }

  agregarPlatillo(saucer: Drinkinterface) {
    const actual = this.saucer.getValue();
    const nuevos = [...actual, saucer];
    this.saucer.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }
    // Agregar estos métodos a la clase foodService
  eliminarPlatillo(saucer: Drinkinterface) {
    const actual = this.saucer.getValue();
    const nuevos = actual.filter(p =>
      p.nombre !== saucer.nombre ||
      p.descripcion !== saucer.descripcion ||
      p.precio !== saucer.precio
    );
    this.saucer.next(nuevos);
    localStorage.setItem('platillos', JSON.stringify(nuevos));
  }

  actualizarPlatillo(original: Drinkinterface, actualizado: Drinkinterface) {
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
