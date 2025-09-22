import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PromoInterface } from '../interface/PromoInterface';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private saucer = new BehaviorSubject<PromoInterface[]>(this.cargarPromocionesDesdeStorage());
  saucer$ = this.saucer.asObservable();
  private nextId = this.obtenerUltimoId();

  private cargarPromocionesDesdeStorage(): PromoInterface[] {
    // Si quieres persistencia, puedes usar localStorage
    return [];
  }

  private obtenerUltimoId(): number {
    const promociones = this.saucer.getValue();
    if (promociones.length === 0) return 1;
    return Math.max(...promociones.map(p => p.id)) + 1;
  }

  private guardarEnStorage(promociones: PromoInterface[]) {
    // Opcional: guardar en localStorage para persistencia
    // localStorage.setItem('promociones', JSON.stringify(promociones));
  }

  agregarPlatillo(promocion: PromoInterface) {
    const actual = this.saucer.getValue();
    const promocionConId: PromoInterface = {
      ...promocion,
      id: this.nextId++
    };
    const nuevos = [...actual, promocionConId];
    this.saucer.next(nuevos);
    this.guardarEnStorage(nuevos);
  }

  eliminarPlatillo(promocion: PromoInterface) {
    const actual = this.saucer.getValue();
    const nuevos = actual.filter(p => p.id !== promocion.id);
    this.saucer.next(nuevos);
    this.guardarEnStorage(nuevos);
  }

  actualizarPlatillo(original: PromoInterface, actualizado: PromoInterface) {
    const actual = this.saucer.getValue();
    const nuevos = actual.map(p =>
      p.id === original.id ? { ...actualizado, id: original.id } : p
    );
    this.saucer.next(nuevos);
    this.guardarEnStorage(nuevos);
  }
}