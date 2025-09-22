import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodInterface } from '../interface/foodInterface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private saucerSource = new BehaviorSubject<foodInterface[]>([]);
  saucer$ = this.saucerSource.asObservable();

  agregarPlatillo(platillo: foodInterface) {
    const actuales = this.saucerSource.value;
    this.saucerSource.next([...actuales, platillo]);
  }

  eliminarPlatillo(platillo: foodInterface) {
    const filtrados = this.saucerSource.value.filter(p => p !== platillo);
    this.saucerSource.next(filtrados);
  }

  actualizarPlatillo(platilloViejo: foodInterface, platilloNuevo: foodInterface) {
    const actualizados = this.saucerSource.value.map(p =>
      p === platilloViejo ? platilloNuevo : p
    );
    this.saucerSource.next(actualizados);
  }
}
