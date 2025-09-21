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
}
