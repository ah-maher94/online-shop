import { Injectable } from '@angular/core';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  userCart: any = [];

  constructor() {}

  // Add or Increase Quantity
  addToCart(product: Product) {
    if (!localStorage.getItem('userCartList')) {
      localStorage.setItem('userCartList', JSON.stringify(this.userCart));
    }
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.userCart.length; item++) {
      if (this.userCart[item]['productId'] == product.id) {
        this.userCart[item]['productQuantity'] =
          parseInt(this.userCart[item]['productQuantity']) + 1;
        localStorage.setItem('userCartList', JSON.stringify(this.userCart));
        return true;
      }
    }
    this.userCart.push({
      productId: product.id,
      productName: product.title,
      productQuantity: 1,
      productImage: product.image,
      productPrice: product.price,
    });

    localStorage.setItem('userCartList', JSON.stringify(this.userCart));
    return true;
  }

  // Reduce Quantity
  removeFromCart(product: Product) {
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.userCart.length; item++) {
      if (this.userCart[item]['productId'] == product.id) {
        this.userCart[item]['productQuantity'] =
          parseInt(this.userCart[item]['productQuantity']) - 1;
        if (this.userCart[item]['productQuantity'] == 0) {
          this.userCart.splice(item, 1);
        }
        localStorage.setItem('userCartList', JSON.stringify(this.userCart));
        return true;
      }
    }
  }

  // Each Product Quantity
  getQuantity(id) {
    if (!localStorage.getItem('userCartList')) {
      return 0;
    }
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.userCart.length; item++) {
      if (this.userCart[item]['productId'] == id) {
        return this.userCart[item]['productQuantity'];
      }
    }
    return 0;
  }

  // Total Count of Cart Items
  getTotalCount() {
    let count = 0;
    if (!localStorage.getItem('userCartList')) {
      return 0;
    }
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.userCart.length; item++) {
      count += this.userCart[item]['productQuantity'];
    }
    return count;
  }

  // Total Price
  getTotalPrice() {
    let count = 0;
    if (!localStorage.getItem('userCartList')) {
      return 0;
    }
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    for (let item = 0; item < this.userCart.length; item++) {
      count +=
        this.userCart[item]['productQuantity'] *
        this.userCart[item]['productPrice'];
    }
    return +count.toFixed(2);
  }

  clearCart() {
    this.userCart = JSON.parse(localStorage.getItem('userCartList'));
    this.userCart = [];
    localStorage.setItem('userCartList', JSON.stringify(this.userCart));
  }
}
