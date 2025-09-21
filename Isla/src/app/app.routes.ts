import { Routes } from '@angular/router';
import { Header } from './shared/header/header';
import { Home } from './pages/home/home';
import { Drink } from './pages/drink/drink';
import { Food } from './pages/food/food';
import { Celebrates } from './pages/celebrates/celebrates';
import { Promotions } from './pages/promotions/promotions';
import { Login } from './shared/login/login';
import { Gestoramd } from './shared/gestoramd/gestoramd';

export const routes: Routes = [
  {path: '', component:Header, children:[
      {path:'Home', component: Home},
      {path:'Drink', component: Drink },
      {path:'Food', component:Food},
      {path:'celebrate', component: Celebrates},
      {path:'prmotion', component: Promotions}
  ] },

  {path:'Login', component: Login, pathMatch:'full'},
  {path:'gestoramd', component:Gestoramd, pathMatch:'full'},
];
