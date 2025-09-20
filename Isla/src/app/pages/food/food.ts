import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Saucer } from '../../core/models/saucer';
import { foodService } from '../../core/service/foodService';

@Component({
  selector: 'app-food',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food implements OnInit{
  saucer: Saucer[] = [];
  constructor(private foodservice: foodService){}

  ngOnInit(): void {
      this.foodservice.saucer$.subscribe(data => {
        console.log("Platillos recibidos en Alimentos: ", data);//debug
        this.saucer = data;
      });
  }

}
