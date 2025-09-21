// src/app/drink/drink.ts
import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drink.html',
  styleUrls: ['./drink.css']
})
export class Drink {
  menuVisible = false;
  private hideTimeout?: any;

  constructor(private elRef: ElementRef) {}

  // Toggle por clic
  toggleMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) this.clearHideTimeout();
  }

  // Mostrar (ej. mouseenter)
  showMenu() {
    this.clearHideTimeout();
    this.menuVisible = true;
  }

  // Ocultar inmediatamente
  hideMenuImmediate() {
    this.clearHideTimeout();
    this.menuVisible = false;
  }

  // Ocultar con pequeño retardo (para evitar flicker al mover el mouse)
  hideMenuWithDelay(delay = 150) {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => (this.menuVisible = false), delay);
  }

  onMouseEnter() { this.showMenu(); }
  onMouseLeave() { this.hideMenuWithDelay(); }

  // Toggle para toque en móviles (touchstart)
  onTouchStart(event: Event) {
    event.stopPropagation();
    this.toggleMenu();
  }

  // Manejo de teclado: Enter/Space abre, Escape cierra
  onButtonKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideMenuImmediate();
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleMenu();
    }
  }

  select(option: string) {
    console.log('Seleccionado:', option);
    // aquí podrías emitir un evento o llamar a un servicio
    this.hideMenuImmediate();
  }

  private clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  // Cerrar al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.menuVisible && !this.elRef.nativeElement.contains(target)) {
      this.hideMenuImmediate();
    }
  }
}
