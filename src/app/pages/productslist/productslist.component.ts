import { Component, computed, NgModule, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/IProduct';
import { FormsModule, NgModel } from '@angular/forms';
import { CartItemService } from '../../core/services/cart-item.service';

@Component({
  selector: 'app-productslist',
  imports: [FormsModule],
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.css',
})
export class ProductslistComponent implements OnInit {
  products = signal<IProduct[]>([]);
  searchText = signal<string>('');
  addedProducts = new Map<number, boolean>();

  ngOnInit(): void {
    this.productService.getProuducts().subscribe({
      next: (res: any) => {
        this.products.set(res.products);
      },
    });
  }

  filtredProducts = computed(() => {
    return this.products().filter((product) => {
      const matchesSearchText = product.title
        .toLowerCase()
        .includes(this.searchText().toLowerCase());
      return matchesSearchText;
    });
  });

  addProduct(product: IProduct) {
    this.cartService.addToCart(product);
  }
  isProductinCart(productId: number): boolean {
    return this.addedProducts.get(productId) || false;
  }
  isProductadded() {
    this.cartService.isProductAddedStatus().subscribe((res) => {
      this.addedProducts = res;
      console.log('product added', this.addedProducts);
    });
  }

  constructor(
    private productService: ProductService,
    private cartService: CartItemService
  ) {}
}
