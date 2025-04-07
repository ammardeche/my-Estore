import { Component, computed, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct, ProductResponse } from '../../core/models/IProduct';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

import { Observable, pipe } from 'rxjs';
import { ICategory } from '../../core/models/ICategory';
import { RouterLink } from '@angular/router';
import { UiService } from '../../core/services/ui.service';
import { CartItemService } from '../../core/services/cart-item.service';
import { ICartItems } from '../../core/models/ICartItems';
import * as Aos from 'aos';

@Component({
  selector: 'app-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  selectedCategory = signal<string>('');
  products = signal<IProduct[]>([]);
  category = signal<ICategory[]>([]);
  searchText = signal<string>('');
  cartItems!: ICartItems;
  addedProducts = new Map<number, boolean>();

  constructor(
    private product_Service: ProductService,
    private ui_Service: UiService,
    private cart_Service: CartItemService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    this.isProductAdded();

    Aos.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
    });
  }

  isProductinCart(productId: number): boolean {
    return this.addedProducts.get(productId) || false;
  }
  fetchProducts() {
    this.product_Service.getProuducts().subscribe({
      next: (res: any) => {
        this.products.set(res.products);
        console.log('Products found', this.products());
        if (this.products().length === 0) {
          console.error('No products found');
        } else {
          console.log('Products found', this.products);
        }
      },
      error: (err) => {
        console.error('fetch product is failed', err);
      },
    });
  }
  fetchCategories() {
    this.product_Service.getCategories().subscribe({
      next: (category: ICategory[]) => {
        this.category.set(category);
        console.log('Category found', this.category());
      },
      error: (err) => {
        console.error('fetch category is failed', err);
      },
    });
  }
  OnCatgeoryChange(category: any) {
    this.selectedCategory.set(category);
    console.log('Selected Category', this.selectedCategory());
  }
  addtoCart(id: number) {
    const product = this.products().find((p) => p.id === id);
    if (product) {
      this.cart_Service.addToCart(product);
    }
  }
  isProductAdded() {
    this.cart_Service.isProductAddedSubject$.subscribe((res) => {
      this.addedProducts = res;
      console.log('the status of product is added : ', res);
    });
  }
}
