import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Saucer } from '../../core/models/saucer';
import { foodInterface } from '../../core/interface/foodInterface';
// Ajusta esta ruta según donde esté realmente cart.service.ts
import { CartService, CartItem } from '../../core/interface/cart.services';

@Component({
  selector: 'app-food',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit {
  foodinterface: foodInterface[] = [];
  
  constructor(
    private saucer:Saucer,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.saucer.food$.subscribe(data => {
      console.log("Platillos recibidos en Alimentos: ", data);
      this.foodinterface = data;
    });
  }

  agregarAlCarrito(platillo: foodInterface) {
    
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