import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  cartProducts = [];
  registerReactiveForm: FormGroup;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  ngOnInit(): void {
    this.registerReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    });
  }

  get registerFormControl() {
    return this.registerReactiveForm.controls;
  }

  handleRegister() {
    console.log(this.registerReactiveForm.value);
  }

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

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
    this.clearCart();
  }
  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
