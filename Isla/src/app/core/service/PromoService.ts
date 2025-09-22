import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PromoInterface } from '../interface/PromoInterface';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private saucer = new BehaviorSubject<PromoInterface[]>([]);
  saucer$ = this.saucer.asObservable();

  constructor() {}

  agregarPlatillo(saucer: PromoInterface) {
    const actual = this.saucer.getValue();
    const nuevos = [...actual, saucer];
    this.saucer.next(nuevos);
  }

  eliminarPlatillo(saucer: PromoInterface) {
    const actual = this.saucer.getValue();
    const nuevos = actual.filter(p =>
      p.nombre !== saucer.nombre ||
      p.descripcion !== saucer.descripcion ||
      p.precio !== saucer.precio
    );
    this.saucer.next(nuevos);
  }

  actualizarPlatillo(original: PromoInterface, actualizado: PromoInterface) {
    const actual = this.saucer.getValue();
    const nuevos = actual.map(p =>
      (p.nombre === original.nombre &&
       p.descripcion === original.descripcion &&
       p.precio === original.precio) ? actualizado : p
    );
    this.saucer.next(nuevos);
  }
}
