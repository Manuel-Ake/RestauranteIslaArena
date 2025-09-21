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
  images = [
    'img/img1.jpg',
    'img/img2.jpg', 
    'img/img3.jpg',
    'img/img4.jpg'
  ];

  texts = [
    'Lo mejor de la isla en un solo lugar para disfrutar',
    'Ven y disfruta de nuestras deliciosas comidas',
    'El mejor ambiente para compartir con amigos',
    'Sabores que te transportan al paraíso'
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.restartCarousel();
  }

  private restartCarousel() {
    this.stopCarousel();
    this.startCarousel();
  }
}