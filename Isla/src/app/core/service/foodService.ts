import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foodInterface } from '../interface/foodInterface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private saucerSource = new BehaviorSubject<foodInterface[]>(this.cargarPlatillosDesdeStorage());
  saucer$ = this.saucerSource.asObservable();
  private nextId = this.obtenerUltimoId();

  private cargarPlatillosDesdeStorage(): foodInterface[] {
    // Si quieres persistencia, puedes usar localStorage
    // Por ahora retornamos array vacío
    return [];
  }

  private obtenerUltimoId(): number {
    const platillos = this.saucerSource.value;
    if (platillos.length === 0) return 1;
    return Math.max(...platillos.map(p => p.id)) + 1;
  }

  private guardarEnStorage(platillos: foodInterface[]) {
    // Opcional: guardar en localStorage para persistencia
    // localStorage.setItem('platillos', JSON.stringify(platillos));
  }

  agregarPlatillo(platillo: foodInterface) {
    const actuales = this.saucerSource.value;
    const platilloConId: foodInterface = {
      ...platillo,
      id: this.nextId++
    };
    const nuevosPlatillos = [...actuales, platilloConId];
    this.saucerSource.next(nuevosPlatillos);
    this.guardarEnStorage(nuevosPlatillos);
  }

  eliminarPlatillo(platillo: foodInterface) {
    const filtrados = this.saucerSource.value.filter(p => p.id !== platillo.id);
    this.saucerSource.next(filtrados);
    this.guardarEnStorage(filtrados);
  }

  actualizarPlatillo(platilloViejo: foodInterface, platilloNuevo: foodInterface) {
    const actualizados = this.saucerSource.value.map(p =>
      p.id === platilloViejo.id ? { ...platilloNuevo, id: platilloViejo.id } : p
    );
    this.saucerSource.next(actualizados);
    this.guardarEnStorage(actualizados);
  }

  // Método para inicializar con datos de ejemplo (opcional)
  inicializarConDatosEjemplo() {
    const platillosEjemplo: foodInterface[] = [
      {
        id: 1,
        nombre: 'Platillo Ejemplo',
        descripcion: 'Descripción de ejemplo',
        precio: 100,
        imagen: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjMwIiBmaWxsPSIjZGRkIi8+PC9zdmc+'
      }
    ];
    this.saucerSource.next(platillosEjemplo);
    this.nextId = 2;
  }
}