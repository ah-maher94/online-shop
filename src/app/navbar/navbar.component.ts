import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartProducts = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  getCartProducts() {
    this.cartProducts = JSON.parse(localStorage.getItem('userCartList'));
    return this.cartProducts;
  }

  getTotalCount() {
    return this.shoppingCartService.getTotalCount();
  }
}
