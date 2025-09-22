import { Component } from '@angular/core';
import { FishesService } from '../../core/service/FishesService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/interface/cart.services';
import { Fish } from '../../core/interface/Fish';
@Component({
  selector: 'app-fishes',
  imports: [CommonModule,FormsModule],
  templateUrl: './fishes.html',
  styleUrl: './fishes.css'
})
export class Fishes {
  saucer: Fish[] = [];

    constructor(
      private foodservice: FishesService,
      private cartService: CartService
    ) {}

    ngOnInit(): void {
      this.foodservice.saucer$.subscribe(data => {
        console.log("Platillos recibidos en Alimentos: ", data);
        this.saucer = data;
      });
    }

    agregarAlCarrito(platillo: Fish) {
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
