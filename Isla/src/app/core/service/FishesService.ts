import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fish } from '../interface/Fish';

@Injectable({
  providedIn: 'root'
})
export class FishesService {
  private saucerSource = new BehaviorSubject<Fish[]>([]);
  saucer$ = this.saucerSource.asObservable();

  agregarPlatillo(platillo: Fish) {
    const actuales = this.saucerSource.value;
    this.saucerSource.next([...actuales, platillo]);
  }

  eliminarPlatillo(platillo: Fish) {
    const filtrados = this.saucerSource.value.filter(p => p !== platillo);
    this.saucerSource.next(filtrados);
  }

  actualizarPlatillo(platilloViejo: Fish, platilloNuevo: Fish) {
    const actualizados = this.saucerSource.value.map(p =>
      p === platilloViejo ? platilloNuevo : p
    );
    this.saucerSource.next(actualizados);
  }
}
