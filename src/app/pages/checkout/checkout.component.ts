import { Component, OnInit, signal } from '@angular/core';
import { CartItemService } from '../../core/services/cart-item.service';
import { ICartItems } from '../../core/models/ICartItems';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems = signal<ICartItems[]>([]);

  /**
   *
   */
  constructor(private cartService: CartItemService) {}

  ngOnInit(): void {
    this.getitem();
  }

  getitem() {
    this.cartService.getCartItem().subscribe((res) => {
      console.log(res);
      this.cartItems.set(res);
    });
  }
}
