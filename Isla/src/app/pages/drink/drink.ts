import { Component } from '@angular/core';
import { DrinkService } from '../../core/service/DrinkService';
import { Drinkinterface } from '../../core/interface/drink';
import { CartService, CartItem } from '../../core/interface/cart.services';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './drink.html',
  styleUrls: ['./drink.css']
})
export class Drink {
  saucer: Drinkinterface[] = [];

  constructor(
    private drinkService: DrinkService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.drinkService.saucer$.subscribe(data => {
      console.log("Bebidas recibidas: ", data);
      this.saucer = data;
    });
  }

  agregarAlCarrito(platillo: Drinkinterface) {
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
