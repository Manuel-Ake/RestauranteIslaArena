import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {
  imagenes = [
    'img1.jpg',
    'img2.jpg', 
    'img3.jpg',
    'img4.jpg'
  ];

  textos = [
    'Lo mejor de la isla en un solo lugar',
    'Ven y disfruta de nuestras deliciosas comidas',
    'El mejor ambiente para compartir con amigos',
    'Sabores que te transportan al paraíso'
  ];

  imagenActual = 0;
  private intervalId: any;

  ngOnInit() {
    console.log('✅ Carrusel INICIADO');
    console.log('🖼️ Imágenes:', this.imagenes);
    console.log('📍 Imagen actual:', this.imagenActual);
    this.iniciarCarrusel();
  }

  ngOnDestroy() {
    this.detenerCarrusel();
  }

  private iniciarCarrusel() {
    console.log('⏰ Iniciando temporizador (4 segundos)');
    this.intervalId = setInterval(() => {
      console.log('🔄 Cambio AUTOMÁTICO de imagen');
      this.siguienteImagen();
    }, 4000);
  }

  private detenerCarrusel() {
    if (this.intervalId) {
      console.log('⏹️ Deteniendo temporizador');
      clearInterval(this.intervalId);
    }
  }

  siguienteImagen() {
    const nuevaImagen = (this.imagenActual + 1) % this.imagenes.length;
    console.log('▶️ Siguiente imagen:', this.imagenActual, '→', nuevaImagen);
    this.imagenActual = nuevaImagen;
    this.reiniciarTemporizador();
  }

  imagenAnterior() {
    const nuevaImagen = (this.imagenActual - 1 + this.imagenes.length) % this.imagenes.length;
    console.log('◀️ Imagen anterior:', this.imagenActual, '→', nuevaImagen);
    this.imagenActual = nuevaImagen;
    this.reiniciarTemporizador();
  }

  cambiarImagen(index: number) {
    console.log('🔘 Cambiando a imagen:', index);
    this.imagenActual = index;
    this.reiniciarTemporizador();
  }

  private reiniciarTemporizador() {
    this.detenerCarrusel();
    this.iniciarCarrusel();
  }
}