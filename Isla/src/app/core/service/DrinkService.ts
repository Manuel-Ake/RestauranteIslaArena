import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drinkinterface } from '../interface/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private saucerSource = new BehaviorSubject<Drinkinterface[]>(this.cargarBebidasDesdeStorage());
  saucer$ = this.saucerSource.asObservable();
  private nextId = this.obtenerUltimoId();

  private cargarBebidasDesdeStorage(): Drinkinterface[] {
    // Si quieres persistencia, puedes usar localStorage
    return [];
  }

  private obtenerUltimoId(): number {
    const bebidas = this.saucerSource.value;
    if (bebidas.length === 0) return 1;
    return Math.max(...bebidas.map(p => p.id)) + 1;
  }

  private guardarEnStorage(bebidas: Drinkinterface[]) {
    // Opcional: guardar en localStorage para persistencia
    // localStorage.setItem('bebidas', JSON.stringify(bebidas));
  }

  agregarPlatillo(bebida: Drinkinterface) {
    const actuales = this.saucerSource.value;
    const bebidaConId: Drinkinterface = {
      ...bebida,
      id: this.nextId++
    };
    const nuevasBebidas = [...actuales, bebidaConId];
    this.saucerSource.next(nuevasBebidas);
    this.guardarEnStorage(nuevasBebidas);
  }

  eliminarPlatillo(bebida: Drinkinterface) {
    const filtrados = this.saucerSource.value.filter(p => p.id !== bebida.id);
    this.saucerSource.next(filtrados);
    this.guardarEnStorage(filtrados);
  }

  actualizarPlatillo(bebidaVieja: Drinkinterface, bebidaNueva: Drinkinterface) {
    const actualizados = this.saucerSource.value.map(p =>
      p.id === bebidaVieja.id ? { ...bebidaNueva, id: bebidaVieja.id } : p
    );
    this.saucerSource.next(actualizados);
    this.guardarEnStorage(actualizados);
  }
}