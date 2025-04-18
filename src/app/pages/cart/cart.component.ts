import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/IProduct';
import { LineItemsCartComponent } from '../line-items-cart/line-items-cart.component';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartItemService } from '../../core/services/cart-item.service';
import { ICartItems } from '../../core/models/ICartItems';
import { SignalGetter, signalSetFn } from '@angular/core/primitives/signals';
import { FormsModule, NgModel } from '@angular/forms';
import { map, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit {
  currencyPipe = inject(CurrencyPipe);
  cartItems = signal<ICartItems[]>([]);
  quantity = signal<number>(0);
  totalPrice!: Signal<number>;

  constructor(
    private cart_service: CartItemService,
    private uiService: UiService
  ) {
    this.totalPrice = this.cart_service.subTotal;
    console.log('total price ', this.totalPrice());
  }

  formattedTotal() {
    return this.currencyPipe.transform(
      this.totalPrice(),
      'USD',
      'symbol',
      '1.2-2'
    );
  }
  ngOnInit(): void {
    this.getitem();
  }

  getitem() {
    this.cart_service.getCartItem().subscribe((res) => {
      this.cartItems.set(res);
    });
  }

  increment(item: ICartItems) {
    this.cart_service.incrementQuantity(item.product.id);
  }
  dicrement(item: ICartItems) {
    this.cart_service.DecrementQuantity(item.product.id);
  }
  closeCart() {
    this.uiService.setCartState(false);
  }
}
