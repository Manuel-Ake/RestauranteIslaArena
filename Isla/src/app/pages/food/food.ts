import { foodInterface } from './../../core/interface/foodInterface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Saucer } from '../../core/models/saucer';// Cambiado
// Ajusta esta ruta según donde esté realmente cart.service.ts
import { CartService, CartItem } from '../../core/interface/cart.services';
import { FoodService } from '../../core/service/foodService';

@Component({
  selector: 'app-food',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit {
  saucer: foodInterface[] = [];

    constructor(
      private foodservice: FoodService,
      private cartService: CartService
    ) {}

    ngOnInit(): void {
      this.foodservice.saucer$.subscribe(data => {
        console.log("Platillos recibidos en Alimentos: ", data);
        this.saucer = data;
      });
    }

    agregarAlCarrito(platillo: foodInterface) {
      const cartItem: CartItem = {
        id: Date.now(),
        nombre: platillo.nombre,
        descripcion: platillo.descripcion,
        precio: platillo.precio,
        imagen: platillo.imagen
      };
      this.cartService.addToCart(cartItem);
      alert(`${platillo.nombre} agregado al carrito!`);
    }
}
