import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/products';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
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

  getTotalPrice() {
    return this.shoppingCartService.getTotalPrice();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  addToCart(product) {
    this.cartProducts = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.cartProducts.length; item++) {
      if (this.cartProducts[item]['productId'] == product.productId) {
        this.cartProducts[item]['productQuantity'] =
          parseInt(this.cartProducts[item]['productQuantity']) + 1;
        localStorage.setItem('userCartList', JSON.stringify(this.cartProducts));
        return true;
      }
    }
  }

  removeFromCart(product) {
    this.cartProducts = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.cartProducts.length; item++) {
      if (this.cartProducts[item]['productId'] == product.productId) {
        this.cartProducts[item]['productQuantity'] =
          parseInt(this.cartProducts[item]['productQuantity']) - 1;
        if (this.cartProducts[item]['productQuantity'] == 0) {
          this.cartProducts.splice(item, 1);
        }
        localStorage.setItem('userCartList', JSON.stringify(this.cartProducts));
        return true;
      }
    }
  }
}
