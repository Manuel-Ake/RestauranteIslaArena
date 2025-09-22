import { Component } from '@angular/core';
import { FishesService } from '../../core/service/FishesService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fishes',
  imports: [CommonModule,FormsModule],
  templateUrl: './fishes.html',
  styleUrl: './fishes.css'
})
export class Fishes {
  constructor(private fishesService: FishesService) {}

  get fishes() {
    return this.fishesService.getFishes();
  }
}
