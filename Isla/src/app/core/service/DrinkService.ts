import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drinkinterface } from '../interface/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private saucerSource = new BehaviorSubject<Drinkinterface[]>([]);
  saucer$ = this.saucerSource.asObservable();

  agregarPlatillo(platillo: Drinkinterface) {
    const actuales = this.saucerSource.value;
    this.saucerSource.next([...actuales, platillo]);
  }

  eliminarPlatillo(platillo: Drinkinterface) {
    const filtrados = this.saucerSource.value.filter(p => p !== platillo);
    this.saucerSource.next(filtrados);
  }

  actualizarPlatillo(platilloViejo: Drinkinterface, platilloNuevo: Drinkinterface) {
    const actualizados = this.saucerSource.value.map(p =>
      p === platilloViejo ? platilloNuevo : p
    );
    this.saucerSource.next(actualizados);
  }
}
