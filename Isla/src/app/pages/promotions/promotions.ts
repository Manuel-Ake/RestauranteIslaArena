import { Component } from '@angular/core';
import { PeomoService } from '../../core/service/PromoService';
import { CartService, CartItem } from '../../core/interface/cart.services';
import { PromoInterface } from '../../core/interface/PromoInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-promotions',
  imports: [CommonModule,FormsModule],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css'
})
export class Promotions {
  saucer: PromoInterface[] = [];

      constructor(
        private foodservice: PeomoService,
        private cartService: CartService
      ) {}

      ngOnInit(): void {
        this.foodservice.saucer$.subscribe(data => {
          console.log("Platillos recibidos en Alimentos: ", data);
          this.saucer = data;
        });
      }

      agregarAlCarrito(platillo: PromoInterface) {
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
