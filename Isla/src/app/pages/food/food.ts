import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { foodInterface } from '../../core/interface/foodInterface';// Cambiado
import { Saucer } from '../../core/models/saucer';// Cambiado
// Ajusta esta ruta según donde esté realmente cart.service.ts
import { CartService, CartItem } from '../../core/interface/cart.services';

@Component({
  selector: 'app-food',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit {
  saucer: foodInterface[] = []; // Cambiado
  
  constructor(
    private saucerService: Saucer, // Cambiado
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.saucerService.platillo$.subscribe(data => { // Cambiado
      console.log("Platillos recibidos en Alimentos: ", data);
      this.saucer = data;
    });
  }

  agregarAlCarrito(platillo: foodInterface) { // Cambiado
    
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