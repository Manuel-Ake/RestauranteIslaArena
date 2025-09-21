import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// RUTA CORREGIDA - la que tenías era incorrecta
import { CartService, CartItem } from '../../core/interface/cart.services';

@Component({
  selector: 'app-mycart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mycart.html',
  styleUrl: './mycart.css'
})
export class Mycart implements OnInit, OnDestroy {
  
  minutes: number = 14;
  seconds: number = 59;
  private timerInterval: any;
  cartItems: CartItem[] = [];

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.updateTimer();
      this.cdRef.detectChanges();
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimer() {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.stopTimer();
      }
    }
  }

  get formattedTime(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  finalizarPedido() {
    if (this.cartItems.length > 0) {
      alert('¡Pedido realizado con éxito!');
      this.cartService.clearCart();
      this.cartItems = [];
    }
  }

  continueShopping() {
    this.router.navigate(['/Home']);
  }
}