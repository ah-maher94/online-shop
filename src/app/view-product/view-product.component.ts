import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/products';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  // product :any = [];
  selectedProduct: Product;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getProduct(id).subscribe((data) => {
      console.log(data);
      // this.product = Object.entries(data);
      this.selectedProduct = data;
      console.log(this.selectedProduct);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(selectedProduct: Product) {
    this.shoppingCartService.addToCart(selectedProduct);
  }

  removeFromCart(selectedProduct: Product) {
    this.shoppingCartService.removeFromCart(selectedProduct);
  }
  getQuantity(id) {
    return this.shoppingCartService.getQuantity(id);
  }
}
