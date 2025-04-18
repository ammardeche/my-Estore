import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../core/models/IProduct';
import { CartItemService } from '../../core/services/cart-item.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [NgFor, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  router = inject(ActivatedRoute);
  product!: IProduct;
  getId: any;
  addedProducts = new Map<number, boolean>();

  constructor(
    private product_Service: ProductService,
    private cart_service: CartItemService
  ) {}

  ngOnInit(): void {
    this.getId = this.router.snapshot.paramMap.get('id');
    this.getProduct();
    this.productAddedToCart();
  }

  selectedImage: string | null = null;

  onImageClick(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  getProduct() {
    this.product_Service.getProductById(this.getId).subscribe({
      next: (res: IProduct) => {
        this.product = res;
      },

      error: (err) => {
        console.error('fetch product is failed', err);
      },
    });
  }

  // inssure that the product added to the cart item

  addtocart(product: IProduct) {
    this.cart_service.addToCart(product);
    this.addedProducts.set(product.id, true);
  }

  productAddedToCart() {
    this.cart_service.isProductAddedSubject$.subscribe((res) => {
      this.addedProducts = res;
    });
  }

  isProductInCart(productId: number): boolean {
    return this.addedProducts.get(productId) || false;
  }
}
