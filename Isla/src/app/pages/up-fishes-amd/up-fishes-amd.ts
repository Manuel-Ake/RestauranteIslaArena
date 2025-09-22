import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FishesService } from '../../core/service/FishesService';
import { Fish } from '../../core/interface/Fish';
@Component({
  selector: 'app-up-fishes-amd',
  imports: [CommonModule,FormsModule,],
  templateUrl: './up-fishes-amd.html',
  styleUrl: './up-fishes-amd.css'
})
export class UpFishesAmd {
  nombre = '';
  descripcion = '';
  precio!: number;
  imageBase64: string = '';
  editIndex: number | null = null;

  // Inyectar el servicio
  constructor(private fishesService: FishesService) {}

  OnfileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  subirFish() {
    if (!this.nombre || !this.descripcion || !this.precio || !this.imageBase64) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoFish: Fish = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.imageBase64
    };

    if (this.editIndex !== null) {
      this.fishesService.updateFish(this.editIndex, nuevoFish);
      this.editIndex = null;
    } else {
      this.fishesService.addFish(nuevoFish);
    }

    this.limpiarFormulario();
  }

  editarFish(index: number) {
    const fishes = this.fishesService.getFishes();
    if (index >= 0 && index < fishes.length) {
      const fish = fishes[index];
      this.nombre = fish.nombre;
      this.descripcion = fish.descripcion;
      this.precio = fish.precio;
      this.imageBase64 = fish.imagen;
      this.editIndex = index;
    }
  }

  eliminarFish(index: number) {
    this.fishesService.deleteFish(index);
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.imageBase64 = '';
  }

  // Obtener la lista de fishes para mostrar en la tabla
  get fishes() {
    return this.fishesService.getFishes();
  }
}
