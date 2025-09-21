import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Saucer } from '../../core/models/saucer';
import { foodService } from '../../core/service/foodService';
// Ajusta esta ruta según donde esté realmente cart.service.ts
import { CartService, CartItem } from '../../core/service/cart.services/cart.services';

@Component({
  selector: 'app-food',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit {
  saucer: Saucer[] = [];
  
  constructor(
    private foodservice: foodService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.foodservice.saucer$.subscribe(data => {
      console.log("Platillos recibidos en Alimentos: ", data);
      this.saucer = data;
    });
  }

  agregarAlCarrito(platillo: Saucer) {
    const cartItem: CartItem = {
      id: Date.now(), // ID generado automáticamente
      nombre: platillo.nombre,
      descripcion: platillo.descripcion,
      precio: platillo.precio,
      imagen: platillo.imagen
    };
    
    this.cartService.addToCart(cartItem);
    alert(`${platillo.nombre} agregado al carrito!`);
  }
}