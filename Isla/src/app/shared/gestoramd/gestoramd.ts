import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/*import { Router } from '@angular/router';*/
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gestoramd',
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink],
  templateUrl: './gestoramd.html',
  styleUrl: './gestoramd.css'
})
export class Gestoramd {
  constructor(private router: Router) { }
  cerrarSesion() {
    this.router.navigate(['']);
  }
}
