import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fish } from '../interface/Fish';

@Injectable({
  providedIn: 'root'
})
export class FishesService {
  private saucerSource = new BehaviorSubject<Fish[]>(this.cargarEspecialidadesDesdeStorage());
  saucer$ = this.saucerSource.asObservable();
  private nextId = this.obtenerUltimoId();

  private cargarEspecialidadesDesdeStorage(): Fish[] {
    // Si quieres persistencia, puedes usar localStorage
    return [];
  }

  private obtenerUltimoId(): number {
    const especialidades = this.saucerSource.value;
    if (especialidades.length === 0) return 1;
    return Math.max(...especialidades.map(p => p.id)) + 1;
  }

  private guardarEnStorage(especialidades: Fish[]) {
    // Opcional: guardar en localStorage para persistencia
    // localStorage.setItem('especialidades', JSON.stringify(especialidades));
  }

  agregarPlatillo(especialidad: Fish) {
    const actuales = this.saucerSource.value;
    const especialidadConId: Fish = {
      ...especialidad,
      id: this.nextId++
    };
    const nuevasEspecialidades = [...actuales, especialidadConId];
    this.saucerSource.next(nuevasEspecialidades);
    this.guardarEnStorage(nuevasEspecialidades);
  }

  eliminarPlatillo(especialidad: Fish) {
    const filtrados = this.saucerSource.value.filter(p => p.id !== especialidad.id);
    this.saucerSource.next(filtrados);
    this.guardarEnStorage(filtrados);
  }

  actualizarPlatillo(especialidadVieja: Fish, especialidadNueva: Fish) {
    const actualizados = this.saucerSource.value.map(p =>
      p.id === especialidadVieja.id ? { ...especialidadNueva, id: especialidadVieja.id } : p
    );
    this.saucerSource.next(actualizados);
    this.guardarEnStorage(actualizados);
  }
}