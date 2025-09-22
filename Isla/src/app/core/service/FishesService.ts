
import { Injectable } from '@angular/core';
import { Fish } from '../interface/Fish';

@Injectable({
  providedIn: 'root'
})
export class FishesService {
  private fishes: Fish[] = [];

  getFishes(): Fish[] {
    return this.fishes;
  }

  addFish(fish: Fish): void {
    this.fishes.push(fish);
  }

  updateFish(index: number, fish: Fish): void {
    if (index >= 0 && index < this.fishes.length) {
      this.fishes[index] = fish;
    }
  }

  deleteFish(index: number): void {
    if (index >= 0 && index < this.fishes.length) {
      this.fishes.splice(index, 1);
    }
  }
}
