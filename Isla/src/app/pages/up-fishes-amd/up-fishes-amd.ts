import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-up-fishes-amd',
  imports: [CommonModule,FormsModule,],
  templateUrl: './up-fishes-amd.html',
  styleUrl: './up-fishes-amd.css'
})
export class UpFishesAmd {

    nombre = '';
    descripcion = '';
    precio!: number;
    imageBase64: string = '';



    OnfileSelected(event: any){
      const file = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () =>{
          this.imageBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

    subirsaucer(){

    }
}
