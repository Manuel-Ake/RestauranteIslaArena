import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gestoramd',
  imports: [CommonModule],
  templateUrl: './gestoramd.html',
  styleUrl: './gestoramd.css'
})
export class Gestoramd {
  // para navegar en las secciones

  activeSection: string = 'resumen';

  setSection(section: string) {
    this.activeSection = section;

  }

}
