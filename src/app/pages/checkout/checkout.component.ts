import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CartItemService } from '../../core/services/cart-item.service';
import { ICartItems } from '../../core/models/ICartItems';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import * as AOS from 'aos';
import { filter } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  cartItems = signal<ICartItems[]>([]);
  subTotal!: Signal<number>;

  constructor(private cartService: CartItemService, private router: Router) {
    this.subTotal = this.cartService.subTotal;
  }

  shippingCost(): number {
    const subtotal = this.subTotal();
    if (subtotal === 0 || subtotal > 50) {
      return 0;
    }
    return 10;
  }

  totalCost(): number {
    return this.subTotal() + this.shippingCost() + this.salesTax();
  }

  salesTax(): number {
    const taxRate = 0.1;

    return this.subTotal() * taxRate;
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    this.getitem();
  }

  getitem() {
    this.cartService.getCartItem().subscribe((res) => {
      console.log(res);
      this.cartItems.set(res);

      setTimeout(() => AOS.refresh(), 0);
    });
  }

  incrementQuantity(productId: number) {
    this.cartService.incrementQuantity(productId);
  }
  DecrementQuantity(productId: number) {
    this.cartService.DecrementQuantity(productId);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }
}
