import { Injectable, signal } from '@angular/core';
import { ICartItems } from '../models/ICartItems';
import { IProduct } from '../models/IProduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  cartItemsSubject$ = new BehaviorSubject<ICartItems[]>([]);
  isProductAddedSubject$ = new BehaviorSubject<Map<number, boolean>>(new Map());
  incQuantity$ = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(product: IProduct) {
    const currentProducts = this.cartItemsSubject$.getValue();
    const isProductAdded = this.isProductAddedSubject$.getValue();
    const incQuantity = this.incQuantity$.getValue();

    if (!currentProducts.some((item) => item.product.id === product.id)) {
      // !true
      this.cartItemsSubject$.next([
        ...currentProducts,
        { product, quantity: 1 },
      ]);

      isProductAdded.set(product.id, true);
      this.isProductAddedSubject$.next(isProductAdded);
    }
  }

  incrementQuantity(productId: number) {
    const currentProduct = this.cartItemsSubject$.getValue();
    const updateCart = currentProduct.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    this.cartItemsSubject$.next(updateCart);
  }
  DecrementQuantity(productId: number) {
    const currentProduct = this.cartItemsSubject$.getValue();
    const updateCart = currentProduct.map((item) =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    this.cartItemsSubject$.next(updateCart);
  }

  // inssure that the is product add observed
  isProductAddedStatus(): Observable<Map<number, boolean>> {
    return this.isProductAddedSubject$.asObservable();
  }

  getCartItem(): Observable<ICartItems[]> {
    return this.cartItemsSubject$.asObservable();
  }

  removeItem(productId: number) {
    const currentProduct = this.cartItemsSubject$.getValue();
    const updateCart = currentProduct.filter(
      (item) => item.product.id !== productId
    );

    this.cartItemsSubject$.next(updateCart);
  }
}
