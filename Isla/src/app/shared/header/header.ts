import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Home } from "../../pages/home/home";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink,CommonModule, RouterOutlet, Home],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
   homeActive: boolean = true; // INICIO empieza encendido

  constructor(private router: Router) {}

  goHome() {
    if (!this.homeActive) {
      this.homeActive = true;
      this.router.navigateByUrl(''); // Navega a la raíz (home)
    }
    // Si ya está activo, no hace nada (evita sobrecarga)
  }

  setHome(state: boolean) {
    this.homeActive = state;
  }
}
