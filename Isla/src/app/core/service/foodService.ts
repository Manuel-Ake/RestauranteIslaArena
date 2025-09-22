import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodInterface } from '../interface/foodInterface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private saucerSource = new BehaviorSubject<foodInterface[]>([]);
  saucer$ = this.saucerSource.asObservable();
  private nextId = 1; // Contador para IDs

  agregarPlatillo(platillo: foodInterface) {
    const actuales = this.saucerSource.value;
    const platilloConId = {
      ...platillo,
      id: this.nextId++ // Asignar ID único
    };
    this.saucerSource.next([...actuales, platilloConId]);
  }

  eliminarPlatillo(platillo: foodInterface) {
    const filtrados = this.saucerSource.value.filter(p => p.id === platillo.id);
    this.saucerSource.next(filtrados);
  }

  actualizarPlatillo(platilloViejo: foodInterface, platilloNuevo: foodInterface) {
    const actualizados = this.saucerSource.value.map(p =>
      p.id === platilloViejo.id ? { ...platilloNuevo, id: platilloViejo.id } : p
    );
    this.saucerSource.next(actualizados);
  }
}